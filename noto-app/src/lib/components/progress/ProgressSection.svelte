<script>
// @ts-nocheck

	import ProgressBar from './ProgressBar.svelte';
	import { notos } from '../../store/NotoStore';
	export let completePercentage = 0;
	export let progressPercentage = 0;
	$: totalCount = $notos.length;
	$: completeCount = $notos.filter((todo) => todo.complete).length;
	$: progressCount = $notos.filter((todo) => !todo.complete).length;
	$: completePercentage = Math.round((completeCount / totalCount) * 100) || 0;
	$: progressPercentage = Math.round((progressCount / totalCount) * 100) || 0;
</script>

<section class="mt-10 bg-slate-200 rounded-xl p-6">
	<h3 class="text-xl font-bold text-gray-three"> ToDo Progress </h3>
	<div class="mt-8 space-y-8">
		<ProgressBar title="In Progress" percentage={progressPercentage} />
		<ProgressBar title="Completed" percentage={completePercentage} />
	</div>
</section>