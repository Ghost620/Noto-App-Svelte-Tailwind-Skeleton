<script>
// @ts-nocheck
	export let percentage;
	export let color;
	export let count;
</script>

<div class="flex items-center space-x-16">
	<div class="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-50">
		<div
		class="h-4 rounded-full transition-all duration-500 ease-out {color}"
		style="width: {percentage}%"
		/>
	</div>
	<div class="text-base font-normal h-1">
		<p class="w-max">{percentage}% ({count})</p>
	</div>
</div>