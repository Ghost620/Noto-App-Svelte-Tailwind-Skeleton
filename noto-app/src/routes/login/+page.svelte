
<div class="flex flex-col mt-40 p-6 max-w-7xl m-72">
	<form method="POST" class="space-y-6 flex flex-col">
		<hgroup class="space-y-2">
			<h2 class="text-gray-800 text-4xl font-bold">Login</h2>
			<h3 class="font-medium">Welcome back!</h3>
		</hgroup>
	
		<div class="flex flex-col">
			<label class="font-medium my-2" for="username">Username</label>
			<input class="rounded-lg" type="text" id="username" name="username" required />
		
			<label class="font-medium my-2" for="password">Password</label>
			<input class="rounded-lg" type="password" id="password" name="password" required />
		</div>
	
		<button on:click={() => window.localStorage.setItem('user', 'true')} type="submit" class="rounded-lg font-semibold h-12 text-white bg-cyan-700 hover:bg-cyan-800"> Login </button>
	</form>
	<p class="mt-4"> Don't have an account? <a href="/register" class="underline hover:text-white"> Register </a></p>
</div>
