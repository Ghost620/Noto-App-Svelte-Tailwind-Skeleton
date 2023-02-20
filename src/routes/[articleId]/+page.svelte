<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
	$: ({ article } = data)

    import TodoFooter from "../../lib/components/TodoFooter.svelte";
    import NotesFooter from '../../lib/components/NotesFooter.svelte';

    async function handleSubmit(event: { preventDefault: () => void; target: any; }) {
        event.preventDefault();

        const radioButtons = document.querySelectorAll('input[type="radio"]');
        let selectedValue;

        radioButtons.forEach(radio => {
            if ((radio as HTMLInputElement).checked) {
                selectedValue = (radio as HTMLInputElement).value;
            }
        });

        const formData = new URLSearchParams({
            type: (article.type.split('-')[0] == 'todo') ? ( (selectedValue == 'green') ? 'todo-green' : ((selectedValue == 'yellow') ? 'todo-yellow' : 'todo-red' ) ) : 'note',
            content: (document.getElementById('content') as HTMLInputElement)?.value,
        });
        
        const response = await fetch('?/updateArticle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.ok) {
            window.location.href = '/';
        }
    }

</script>

<div class="flex flex-col items-center align-middle max-h-[80%] m-28 space-y-6">

    <h3 class="text-2xl font-bold"> Editing: {article.type.split('-')[0]} </h3>
    <form class="w-1/2 flex flex-col space-y-12 items-center" action="?/updateArticle" on:submit={handleSubmit} method="POST">
        <textarea class="w-full rounded-2xl overflow-hidden rounded-br-none" id="content" name="content" value={article.content} placeholder="Leave a NoTo..." rows={article.content.split('\n').length+3} />
        {#if article.type.split('-')[0] == 'todo'}
            <TodoFooter />
        {:else}
            <NotesFooter />
        {/if}
        <button class="bg-cyan-600 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit"> UPDATE </button>
    </form>

</div>