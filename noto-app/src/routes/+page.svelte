<script lang="ts">
	import AddTodoSection from "../lib/components/todos/AddTodoSection.svelte";
	import TodoSection from '../lib/components/todos/TodoSection.svelte';
	import ProgressSection from '../lib/components/progress/ProgressSection.svelte';

    let isNotes = false;

    import type { PageData } from './$types'
	export let data: PageData
	$: ({ articles } = data)
    
</script>

<div class="min-h-screen bg-slate-400 selection:bg-green-300 md:p-24 md:px-8">
    <main class="mx-auto min-h-screen max-w-none rounded-none bg-slate-200 px-5 py-10 outline-none md:min-h-max md:max-w-[60rem] md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-slate-200">

        <div class="flex items-center justify-evenly pt-5 pb-10">
            <span class="flex-start font-bold text-gray-900 text-2xl">Notes</span>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" bind:checked={isNotes} value="" class="sr-only peer">
                <div class="w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
            <span class="flex-end font-bold text-gray-900 text-2xl"> ToDo </span>
        </div>

        {#if isNotes}

            <h1 class="text-2xl font-bold text-gray-600"> Dashboard </h1>
            <div class="mt-10">
                <AddTodoSection />
                <TodoSection />
                <ProgressSection />
            </div>

        {:else}

            <div class="grid">
                <div>
                    <h2>Articles:</h2>
                    {#each articles as article}
                        <article>
                            <header>{article.title}</header>
                            <p>
                                {article.content}
                            </p>
                            <form action="?/deleteArticle&id={article.id}" method="POST">
                                <button type="submit" class="outline secondary">Delete Article</button>
                            </form>
                            <a href="/{article.id}" role="button" class="outline constrast" style="width: 100%;" >Edit Article</a>
                        </article>
                    {/each}
                </div>
                <form action="?/createArticle" method="POST">
                    <h3>New Article</h3>
                    <label for="title"> Title </label>
                    <input type="text" id="title" name="title" />
                    <label for="title"> Title </label>
                    <textarea id="content" name="content" rows={5} />
                    <button type="submit">Add Article</button>
                </form>
            </div>

        {/if}


    </main>
</div>>