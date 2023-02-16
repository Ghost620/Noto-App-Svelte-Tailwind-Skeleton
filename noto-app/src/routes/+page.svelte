<script lang="ts">
	import AddTodoSection from "../lib/components/todos/AddTodoSection.svelte";
	import TodoSection from '../lib/components/todos/TodoSection.svelte';
	import ProgressSection from '../lib/components/progress/ProgressSection.svelte';
    import NotesFooter from "../lib/components/NotesFooter.svelte";
    import TodoFooter from "../lib/components/TodoFooter.svelte";
    import { isNotes } from '../lib/store/NotoStore';
    import type { PageData } from './$types'
	export let data: PageData
	$: ({ articles } = data)

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
            type: $isNotes ? ( (selectedValue == 'green') ? 'todo-green' : ((selectedValue == 'yellow') ? 'todo-yellow' : 'todo-red' ) ) : 'note',
            content: (document.getElementById('content') as HTMLInputElement)?.value 
        });
        
        const response = await fetch('?/createArticle', {
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

<div class="bg-slate-400 selection:bg-green-300 md:p-24 md:px-8">
    
    <div class="flex space-x-4 max-h-screen">

        <div class="w-1/2 space-y-6 mt-4">

            <div class="flex flex-col space-y-5 h-[90%] p-2 overflow-y-scroll">
                {#each articles as article}
                    <article class="py-3 px-2 bg-slate-300 border-8 {article.type.split('-')[0] == 'todo' ? (article.type.split('-')[1] == 'green' ? 'border-green-600' : (article.type.split('-')[1] == 'yellow' ? 'border-yellow-600' : 'border-red-600')) : 'border-gray-600' } rounded-md">
                        <header class="uppercase font-bold bg-slate-500 text-white -mx-2 px-3 py-2 -mt-3">{article.type.split('-')[0]}</header>
                        <p class="font-semibold px-3 py-4">
                            {article.content}
                        </p>
                        <div class="flex -space-x-12 justify-evenly w-full">
                            <a href="/{article.id}" role="button" class="bg-teal-600 hover:bg-teal-700 text-white rounded-md w-20 h-8 text-center py-1">Edit</a>
                            <form action="?/deleteArticle&id={article.id}" method="POST">
                                <button type="submit" class="bg-red-600 hover:bg-red-700 text-white rounded-md w-20 h-8 text-center">Delete</button>
                            </form>
                        </div>
                    </article>
                {/each}
            </div>

        </div>

        <div class="flex flex-col w-1/2">
            <main class="mx-auto w-full rounded-none bg-slate-200 px-5 py-10 outline-none md:w-full md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-slate-200">
                <form class="w-full flex flex-col space-y-8 items-center" action="?/createArticle"on:submit={handleSubmit} method="POST">
    
                    <div class="flex items-center justify-evenly pt-5 pb-10 space-x-8">
                        <span class="flex-start font-bold text-gray-900 text-2xl">Notes</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" bind:checked={$isNotes} on:click={() => isNotes.set(!$isNotes)} class="sr-only peer">
                            <div class="w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                        <span class="flex-end font-bold text-gray-900 text-2xl"> ToDo </span>
                    </div>
    
                    {#if $isNotes}
                        <textarea class="w-full" id="content" name="content" placeholder="Leave a NoTo..." rows={10} />
    
                        <TodoFooter />
    
                        <button class="bg-cyan-500 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit">POST</button>
                    {:else}
                        <textarea class="w-full" id="content" name="content" placeholder="Leave a NoTo..." rows={10} />
                        
                        <NotesFooter />

                        <button class="bg-cyan-500 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit">POST</button>
                    {/if}
    
                </form>
            </main>
            <ProgressSection />
        </div>
    </div>

</div>>