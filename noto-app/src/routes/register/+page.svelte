

<div class="flex flex-col mt-40 p-6 max-w-7xl m-72">
	<form method="POST" class="space-y-6 flex flex-col">
		<hgroup class="space-y-2">
			<h2 class="text-gray-800 text-4xl font-bold">Register</h2>
			<h3 class="font-medium">To post Notos, you'll need an account.</h3>
		</hgroup>
	
		<div class="flex flex-col">
			<label class="font-medium my-2" for="name">Name</label>
			<input class="rounded-lg" type="text" id="name" name="name" required />
		
			<label class="font-medium my-2" for="username">Username</label>
			<input class="rounded-lg" type="text" id="username" name="username" required />
		
			<label class="font-medium my-2" for="password">Password</label>
			<input class="rounded-lg" type="password" id="password" name="password" required />
		</div>
	
		<button type="submit" class="rounded-lg font-semibold h-12 text-white bg-green-700 hover:bg-green-800">Register</button>
	</form>
	<p class="mt-4">Already have an account? <a href="/login" class="underline hover:text-white">Login</a></p>
</div>
