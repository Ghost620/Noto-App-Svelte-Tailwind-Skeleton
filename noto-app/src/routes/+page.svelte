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
    <main class="mx-auto min-h-screen w-full rounded-none bg-slate-200 px-5 py-10 outline-none md:min-h-max max-h-screen md:w-10/12 md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-slate-200">

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

            <div class="flex space-x-4">

                <div class="w-1/2 space-y-6">
                    <h2 class="text-2xl font-bold">NOTES</h2>
                    
                    <div class="flex flex-col space-y-5 h-[23.5%] p-2 overflow-y-scroll">
                        {#each articles as article}
                            <article class="py-3 px-2 bg-slate-300 outline rounded">
                                <header class="uppercase font-bold bg-slate-400 -mx-2 px-3 py-2 -mt-3">{article.title}</header>
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

                    <div class="outline rounded-md px-2 -mt-10 pb-2">
                        <ProgressSection />
                    </div>
                </div>

                <form class="w-1/2 flex flex-col space-y-2 items-center" action="?/createArticle" method="POST">
                    <h3 class="text-2xl font-bold">New Note</h3>
                    <label class="w-full" for="title"> Title </label>
                    <input type="text" id="title" name="title" class="w-full" />
                    <label class="w-full" for="title"> Notes </label>
                    <textarea class="w-full" id="content" name="content" rows={15} />
                    <label class="w-full text-slate-200" for="">e</label>
                    <button class="bg-cyan-500 text-white font-bold hover:bg-cyan-700 text-lg w-1/2 py-2" type="submit">Add Note</button>
                </form>

            </div>

        {/if}


    </main>
</div>>