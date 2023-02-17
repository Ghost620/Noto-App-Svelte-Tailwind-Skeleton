<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
	$: ({ article } = data)

    async function handleSubmit(event: { preventDefault: () => void; target: any; }) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const response = await fetch('?/updateArticle', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            window.location.href = '/';
        }
    }

</script>

<div class="flex flex-col items-center align-middle max-h-[80%] m-12">
    <form class="w-1/2 flex flex-col space-y-12 items-center" action="?/updateArticle" on:submit={handleSubmit} method="POST">
        <h3 class="text-2xl font-bold"> Editing: {article.type.split('-')[0]} </h3>
        <textarea class="w-full" id="content" name="content" rows={15} value={article.content} />
        <button class="bg-cyan-500 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit"> Update Noto </button>
    </form>
</div>