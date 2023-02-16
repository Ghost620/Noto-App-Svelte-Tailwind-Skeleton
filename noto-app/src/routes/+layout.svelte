<script lang="ts">
    import "../app.css";
	import { notos } from '../lib/store/NotoStore'
</script>

<header class="bg-slate-800 z-20 text-white flex justify-between items-center py-2 px-6 top-0 fixed w-full">
	<ul class="w-full py-1">
		<form method="POST" class="flex justify-between w-full px-24">
			<li class="bg-slate-400 text-gray-800 font-bold px-6 py-2 rounded-lg hover:text-white"><a href="/">Home</a></li>
			{#if !$notos}
				<li class="bg-slate-400 text-gray-800 font-bold px-6 py-2 rounded-lg hover:text-white"><a href="/register">Register</a></li>
				<li class="bg-slate-400 text-gray-800 font-bold px-6 py-2 rounded-lg hover:text-white"><a href="/login" role="button">Login</a></li>
			{:else}
				<li class="bg-slate-400 text-gray-800 font-bold px-6 py-2 rounded-lg hover:text-white">
					<button formaction="/logout" type="submit" on:click={() => window.localStorage.setItem('user', 'false')}>Logout</button>
				</li>
			{/if}
		</form>
	</ul>
</header>

<slot />