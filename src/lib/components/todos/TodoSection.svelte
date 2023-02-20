<script>
	import TodoInput from './TodoInput.svelte';
	import { notos } from '../../store/NotoStore';
</script>

<section class="mt-8 space-y-4">
	{#each $notos as todo (todo.id)}
		<TodoInput {todo} />
	{/each}
</section>