<script lang="ts">
    import "../app.css";
	import type { PageData } from './$types';
    export let data: PageData;
    console.log(data)
</script>

<div class="container">

    <header class="bg-blue-500 text-white flex justify-between items-center py-4 px-6">
        <ul>
			<form method="POST">
				<li><a href="/">Home</a></li>
				{#if !data.user}
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
</div>