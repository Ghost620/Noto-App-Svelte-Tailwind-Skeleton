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

<form action="?/updateArticle" on:submit={handleSubmit} method="POST">
	<h3>Editing: {article.title}</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" value={article.title} />
	<label for="title"> Title </label>
	<textarea id="content" name="content" rows={5} value={article.content} />
	<button type="submit">Update Article</button>
</form>