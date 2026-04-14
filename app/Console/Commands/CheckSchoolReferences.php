<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CheckSchoolReferences extends Command
{
    protected $signature = 'school:check';

    protected $description = 'Check school references in database';

    public function handle(): void
    {
        $total = DB::table('school_references')->count();
        $unused = DB::table('school_references')->where('is_used', false)->count();
        $used = DB::table('school_references')->where('is_used', true)->count();

        $this->info('School References Summary:');
        $this->info('==========================');
        $this->info("Total schools: {$total}");
        $this->info("Unused (available): {$unused}");
        $this->info("Used (registered): {$used}");
        $this->info('');

        $byState = DB::table('school_references')
            ->select('negeri', DB::raw('count(*) as total'))
            ->groupBy('negeri')
            ->orderBy('negeri')
            ->get();

        $this->info('Schools by State:');
        $this->info('=================');
        foreach ($byState as $row) {
            $this->info("{$row->negeri}: {$row->total}");
        }
    }
}
