<?php

namespace Database\Seeders;

use App\Models\SchoolReference;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SchoolReferenceSeeder extends Seeder
{
    public function run(): void
    {
        $schoolsByState = $this->loadSchoolsByState();

        $rows = [];
        $usedSlugs = [];

        foreach ($schoolsByState as $negeri => $schools) {
            foreach ($schools as $nama) {
                $baseSlug = Str::slug($negeri.' '.$nama);
                $slug = $baseSlug;
                $counter = 2;

                while (isset($usedSlugs[$slug])) {
                    $slug = $baseSlug.'-'.$counter;
                    $counter++;
                }

                $usedSlugs[$slug] = true;

                $rows[] = [
                    'negeri' => $negeri,
                    'nama' => $nama,
                    'slug' => $slug,
                    'is_used' => false,
                    'used_at' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        SchoolReference::query()->upsert(
            $rows,
            ['slug'],
            ['negeri', 'nama', 'updated_at']
        );
    }

    private function loadSchoolsByState(): array
    {
        $sourcePath = database_path('seeders/data/school_reference_source.txt');

        if (File::exists($sourcePath)) {
            return $this->parseSource(File::get($sourcePath));
        }

        return $this->fallbackSchools();
    }

    private function parseSource(string $content): array
    {
        $states = [
            'WILAYAH PERSEKUTUAN KUALA LUMPUR',
            'WILAYAH PERSEKUTUAN PUTRAJAYA',
            'WILAYAH PERSEKUTUAN LABUAN',
            'NEGERI SEMBILAN',
            'PULAU PINANG',
            'TERENGGANU',
            'SELANGOR',
            'KELANTAN',
            'SARAWAK',
            'JOHOR',
            'KEDAH',
            'MELAKA',
            'PAHANG',
            'PERAK',
            'PERLIS',
            'SABAH',
        ];

        $schoolsByState = [];

        $lines = preg_split('/\r\n|\r|\n/', $content) ?: [];

        foreach ($lines as $line) {
            $line = trim($line);

            if ($line === '' || str_starts_with($line, '<PARSED TEXT FOR PAGE:')) {
                continue;
            }

            if ($line === 'NEGERI NAMA SEKOLAH') {
                continue;
            }

            foreach ($states as $state) {
                if (! str_starts_with($line, $state.' ')) {
                    continue;
                }

                $schoolName = trim(Str::after($line, $state.' '));

                if ($schoolName === '') {
                    continue 2;
                }

                $schoolsByState[$state][] = $schoolName;

                continue 2;
            }
        }

        ksort($schoolsByState);

        return $schoolsByState;
    }

    private function fallbackSchools(): array
    {
        return [
            'PERAK' => [
                'SEKOLAH KEBANGSAAN TOH TANDEWA SAKTI',
                'SEKOLAH KEBANGSAAN PENDITA ZA\'BA',
                'SEKOLAH KEBANGSAAN BANIR',
                'SEKOLAH KEBANGSAAN TEMOH',
                'SEKOLAH KEBANGSAAN CHENDERIANG',
                'SEKOLAH KEBANGSAAN BIDOR',
                'SEKOLAH KEBANGSAAN KAMPONG POH',
                'SEKOLAH KEBANGSAAN BATU TIGA',
                'SEKOLAH KEBANGSAAN BATU MELINTANG',
                'SEKOLAH KEBANGSAAN HAJI HASAN',
            ],
            'SELANGOR' => [
                'SEKOLAH KEBANGSAAN KLANG',
                'SEKOLAH KEBANGSAAN TELOK GADONG',
                'SEKOLAH KEBANGSAAN PELABUHAN KELANG',
                'SEKOLAH KEBANGSAAN TELOK MENEGON',
                'SEKOLAH KEBANGSAAN BUKIT NAGA',
                'SEKOLAH KEBANGSAAN JALAN KEBUN',
                'SEKOLAH KEBANGSAAN BATU BELAH',
                'SEKOLAH KEBANGSAAN RANTAU PANJANG',
                'SEKOLAH KEBANGSAAN SEMENTA',
                'SEKOLAH KEBANGSAAN KAPAR',
            ],
            'PAHANG' => [
                'SEKOLAH KEBANGSAAN FELDA LURAH BILUT',
                'SEKOLAH KEBANGSAAN LEBU',
                'SEKOLAH KEBANGSAAN SRI LAYANG',
                'SEKOLAH KEBANGSAAN TUANKU FATIMAH',
                'SEKOLAH KEBANGSAAN FELDA KG. SERTIK',
                'SEKOLAH KEBANGSAAN SUNGAI DUA',
                'SEKOLAH KEBANGSAAN KARAK',
                'SEKOLAH KEBANGSAAN JAMBU RIAS',
                'SEKOLAH KEBANGSAAN PELANGAI',
                'SEKOLAH KEBANGSAAN SIMPANG PELANGAI',
            ],
            'KELANTAN' => [
                'SEKOLAH KEBANGSAAN ALOR BAKAT',
                'SEKOLAH KEBANGSAAN BACHOK',
                'SEKOLAH KEBANGSAAN BADAK',
                'SEKOLAH KEBANGSAAN BAKONG',
                'SEKOLAH KEBANGSAAN BEKELAM',
                'SEKOLAH KEBANGSAAN SRI KEMUNTING',
                'SEKOLAH KEBANGSAAN BERIS KUBOR BESAR',
                'SEKOLAH KEBANGSAAN BERIS PANCHOR',
                'SEKOLAH KEBANGSAAN BUKIT MARAK',
                'SEKOLAH KEBANGSAAN CHANTUM',
            ],
            'JOHOR' => [
                'SEKOLAH KEBANGSAAN LUBOK',
                'SEKOLAH KEBANGSAAN SERI MAAMOR',
                'SEKOLAH KEBANGSAAN SERI PENGKALAN',
                'SEKOLAH KEBANGSAAN SERI UTAMA',
                'SEKOLAH KEBANGSAAN BAGAN',
                'SEKOLAH KEBANGSAAN SERI SEKAWAN DESA',
                'SEKOLAH KEBANGSAAN GAMBUT',
                'SEKOLAH KEBANGSAAN SG KAJANG',
                'SEKOLAH KEBANGSAAN PESERAI',
                'SEKOLAH KEBANGSAAN SERI CHANTEK',
            ],
            'KEDAH' => [
                'SEKOLAH KEBANGSAAN MOHD ARIFF ABDULLAH',
                'SEKOLAH KEBANGSAAN TELOI KANAN',
                'SEKOLAH KEBANGSAAN TEMBAK',
                'SEKOLAH KEBANGSAAN BADANG',
                'SEKOLAH KEBANGSAAN ASAM JAWA/CAROK KELIAN',
                'SEKOLAH KEBANGSAAN SERI INAS',
                'SEKOLAH KEBANGSAAN PENGHULU ABU BAKAR',
                'SEKOLAH KEBANGSAAN BALING',
                'SEKOLAH KEBANGSAAN DALAM WANG',
                'SEKOLAH KEBANGSAAN TUNKU PUAN HABSAH',
            ],
            'MELAKA' => [
                'SEKOLAH KEBANGSAAN MASJID TANAH',
                'SEKOLAH KEBANGSAAN TANJUNG BIDARA',
                'SEKOLAH KEBANGSAAN OTHMAN SYAWAL',
                'SEKOLAH KEBANGSAAN BUKIT BERINGIN',
                'SEKOLAH KEBANGSAAN RAMUAN CHINA BESAR',
                'SEKOLAH KEBANGSAAN RAMUAN CHINA KECHIL',
                'SEKOLAH KEBANGSAAN AYER LIMAU',
                'SEKOLAH KEBANGSAAN KUALA LINGGI',
                'SEKOLAH KEBANGSAAN PENGKALAN BALAK',
                'SEKOLAH KEBANGSAAN DURIAN DAUN \'K\'',
            ],
            'NEGERI SEMBILAN' => [
                'SEKOLAH KEBANGSAAN AMAR PENGHULU',
                'SEKOLAH KEBANGSAAN KUALA KLAWANG',
                'SEKOLAH KEBANGSAAN TERIANG',
                'SEKOLAH KEBANGSAAN SEPRI TENGAH',
                'SEKOLAH KEBANGSAAN KAMPAI',
                'SEKOLAH KEBANGSAAN PERADONG',
                'SEKOLAH KEBANGSAAN GELANG TERUSAN',
                'SEKOLAH KEBANGSAAN PETASEH',
                'SEKOLAH KEBANGSAAN DATUK UNDANG ABDULLAH',
                'SEKOLAH KEBANGSAAN SUNGAI BULOH',
            ],
            'PULAU PINANG' => [
                'SEKOLAH KEBANGSAAN ALMA',
                'SEKOLAH KEBANGSAAN BUKIT TEH',
                'SEKOLAH KEBANGSAAN GUAR PERAHU',
                'SEKOLAH KEBANGSAAN JALAN BAHARU PERAI',
                'SEKOLAH KEBANGSAAN JUARA',
                'SEKOLAH KEBANGSAAN JURU',
                'SEKOLAH KEBANGSAAN KEBUN SIREH',
                'SEKOLAH KEBANGSAAN KHIR JOHARI',
                'SEKOLAH KEBANGSAAN MACANG BUBOK',
                'SEKOLAH KEBANGSAAN MENGKUANG',
            ],
            'PERLIS' => [
                'SEKOLAH KEBANGSAAN ABI',
                'SEKOLAH KEBANGSAAN TENGKU BUDRIAH',
                'SEKOLAH KEBANGSAAN BESERI',
                'SEKOLAH KEBANGSAAN BINTONG',
                'SEKOLAH KEBANGSAAN BOHOR MALI',
                'SEKOLAH KEBANGSAAN RAJA PEREMPUAN BUDRIAH',
                'SEKOLAH KEBANGSAAN CHUPING',
                'SEKOLAH KEBANGSAAN DATO KAYAMAN',
                'SEKOLAH KEBANGSAAN GUAR NANGKA',
                'SEKOLAH KEBANGSAAN JEJAWI',
            ],
            'TERENGGANU' => [
                'SEKOLAH KEBANGSAAN KAMPONG RAJA',
                'SEKOLAH KEBANGSAAN AMER',
                'SEKOLAH KEBANGSAAN ALOR LINTAH',
                'SEKOLAH KEBANGSAAN KERANDANG',
                'SEKOLAH KEBANGSAAN KUALA BESUT',
                'SEKOLAH KEBANGSAAN TEMBILA',
                'SEKOLAH KEBANGSAAN KAMPUNG NANGKA',
                'SEKOLAH KEBANGSAAN PULAU PERHENTIAN',
                'SEKOLAH KEBANGSAAN BETING LINTANG',
                'SEKOLAH KEBANGSAAN GONG BAYOR',
            ],
            'WILAYAH PERSEKUTUAN KUALA LUMPUR' => [
                'SEKOLAH KEBANGSAAN SULTAN HISAMUDDIN ALAM SHAH',
                'SEKOLAH KEBANGSAAN JALAN PASAR 1',
                'SEKOLAH KEBANGSAAN TUN HUSSEIN ONN',
                'SEKOLAH KEBANGSAAN DATOK KERAMAT 1',
                'SEKOLAH KEBANGSAAN DATOK KERAMAT 2',
                'SEKOLAH KEBANGSAAN POLIS DEPOT',
                'SEKOLAH KEBANGSAAN SENTUL 1',
                'SEKOLAH KEBANGSAAN SETAPAK',
                'SEKOLAH KEBANGSAAN BUKIT BANDARAYA',
                'SEKOLAH KEBANGSAAN BANGSAR',
            ],
            'WILAYAH PERSEKUTUAN LABUAN' => [
                'SEKOLAH KEBANGSAAN BEBULOH',
                'SEKOLAH KEBANGSAAN SUNGAI BEDAUN',
                'SEKOLAH KEBANGSAAN BUKIT KALLAM',
                'SEKOLAH KEBANGSAAN KERUPANG',
                'SEKOLAH KEBANGSAAN PEKAN 1 WP LABUAN',
                'SEKOLAH KEBANGSAAN PEKAN II WP LABUAN',
                'SEKOLAH KEBANGSAAN LAYANG-LAYANGAN',
                'SEKOLAH KEBANGSAAN LUBOK TEMIANG',
            ],
            'WILAYAH PERSEKUTUAN PUTRAJAYA' => [
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 9(1)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 8(1)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 16(1)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 11(1)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 8(2)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 9 (2)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 16 (2)',
                'SEKOLAH KEBANGSAAN PUTRAJAYA PRESINT 11 (3)',
            ],
            'SABAH' => [
                'SEKOLAH KEBANGSAAN AMBUAL',
                'SEKOLAH KEBANGSAAN APIN-APIN',
                'SEKOLAH KEBANGSAAN BANJAR',
                'SEKOLAH KEBANGSAAN BATU LUNGUYAN',
                'SEKOLAH KEBANGSAAN RANCANGAN BIAH',
                'SEKOLAH KEBANGSAAN BINAONG',
                'SEKOLAH KEBANGSAAN BINGKOR',
                'SEKOLAH KEBANGSAAN BONOR',
                'SEKOLAH KEBANGSAAN BULU SILOU',
                'SEKOLAH KEBANGSAAN BUNDU APIN-APIN',
            ],
            'SARAWAK' => [
                'SEKOLAH KEBANGSAAN APAR',
                'SEKOLAH KEBANGSAAN PUAK',
                'SEKOLAH KEBANGSAAN KG BOBAK/SEJINJANG',
                'SEKOLAH KEBANGSAAN MERPATI JEPANG',
                'SEKOLAH KEBANGSAAN RANCANGAN PERUMAHAN RAKYAT \'RPR\'',
                'SEKOLAH KEBANGSAAN SATRIA JAYA',
                'SEKOLAH KEBANGSAAN LAKSAMANA',
                'SEKOLAH KEBANGSAAN SG. MAONG HILIR KUCHING',
                'SEKOLAH KEBANGSAAN MATANG JAYA',
                'SEKOLAH KEBANGSAAN RPR BATU KAWA',
            ],
        ];
    }
}
