<script>
// @ts-nocheck
	import ProgressBar from './ProgressBar.svelte';
	export let articles;
	import { notos } from '../../store/NotoStore';
	let todos = articles.filter((noto) => noto.type !== 'note')

	export let completePercentage = 0;
	export let inprogressPercentage = 0;
	export let notstartedPercentage = 0;
	$: totalCount = todos.length;

	$: completeCount = todos.filter((todo) => todo.type.split('-')[1] == 'green').length;
	$: inprogressCount = todos.filter((todo) => todo.type.split('-')[1] == 'yellow').length;
	$: notstartedCount = todos.filter((todo) => todo.type.split('-')[1] == 'red').length;

	$: completePercentage = Math.round((completeCount / totalCount) * 100) || 0;
	$: inprogressPercentage = Math.round((inprogressCount / totalCount) * 100) || 0;
	$: notstartedPercentage = Math.round((notstartedCount / totalCount) * 100) || 0;
</script>

<section style="display: {$notos == 'true' ? 'block' : 'none'}" class="mt-10 bg-slate-200 rounded-xl p-6">
	<h3 class="text-xl font-bold text-gray-three"> ToDo Progress </h3>
	<div class="mt-8 space-y-8">
		<ProgressBar color={'bg-green-400'} count={completeCount} percentage={completePercentage} />
		<ProgressBar color={'bg-yellow-400'} count={inprogressCount} percentage={inprogressPercentage} />
		<ProgressBar color={'bg-red-400'} count={notstartedCount} percentage={notstartedPercentage} />
	</div>
</section>