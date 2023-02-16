<script    async script lang="ts">
    import "../app.css";
	import { notos } from '../lib/store/NotoStore';
	const func = async () => {
		const response = await fetch('/', { method: 'POST' });
		const data = await response.json();
		console.log(data);
	}
</script>

<header class="bg-blue-500 text-white flex justify-between items-center py-2 px-6">
	<ul class="w-full">
		<form method="POST" class="flex justify-between w-full px-24">
			<li><a href="/">Home</a></li>
			{#if true}
				<li><a href="/register">Register</a></li>
				<li><a href="/login" role="button">Login</a></li>
			<!-- {:else} -->
				<li>
					<button formaction="/logout" type="submit">Logout</button>
				</li>
			{/if}
		</form>
	</ul>
</header>

<slot />