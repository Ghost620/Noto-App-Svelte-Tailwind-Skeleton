<script lang="ts">
// @ts-nocheck
    export let article;
    import NotesFooter from "./NotesFooter.svelte";
    $: typee = article.type
    
    async function handleSubmit(event: { preventDefault: () => void; target: any; }) {
        event.preventDefault();

        const radioButtons = document.getElementById(article.id).parentNode.parentNode.querySelectorAll('input[type="radio"]');
        let selectedValue;

        radioButtons.forEach(radio => {
            if ((radio as HTMLInputElement).checked) {
                selectedValue = (radio as HTMLInputElement).value;
            }
        });

        const formData = new URLSearchParams({
            type: (article.type.split('-')[0] == 'todo') ? ( (selectedValue == 'green') ? 'todo-green' : ((selectedValue == 'yellow') ? 'todo-yellow' : 'todo-red' ) ) : 'note',
            content: (document.getElementById(article.id).parentNode.parentNode.querySelector('textarea') as HTMLInputElement)?.value,
        });

        const response = await fetch(`/?updateArticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.ok) {
            window.location.href = '/';
            console.log('done')
        } else {
            console.log(response)
            throw new Error(`Failed to update article: ${response.status} ${response.statusText}`);
        }
    }

    async function handleChange() {
        const radioButtons = document.getElementById(article.id).parentNode.parentNode.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            if ((radio as HTMLInputElement).checked) {
                typee = 'todo-'+(radio as HTMLInputElement).value;
            }
        });
    }

  </script>

<form action="?/updateArticle&id={article.id}" method="POST" class="py-3 px-2 bg-slate-300 border-8 {article.type.split('-')[0] == 'todo' ? (article.type.split('-')[1] == 'green' ? 'border-green-600' : (article.type.split('-')[1] == 'yellow' ? 'border-yellow-600' : 'border-red-600')) : 'border-gray-600' } rounded-lg">

    <input type="hidden" name="type" value={typee}>
    <div class="flex">

        <div class="w-full">
            <div class="flex -mt-3 mr-2">
                <header class="uppercase font-bold bg-slate-500 text-white -mx-2 pr-4 pl-2 py-2">{article.type.split('-')[0]}</header>
        
                {#if article.type == 'note'}
                    <NotesFooter />
                {:else}
                    <ul class="items-center w-full text-sm font-medium bg-white border border-gray-200 sm:flex dark:bg-slate-500 dark:border-gray-600 text-white">
                                
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 flex flex-col items-center">
                            <div class="flex items-center">
                                <input on:change={handleChange} id="horizontal-list-radio-license" type="radio" value="red" name="list-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500">
                                <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-white">Not Started </label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 flex flex-col items-center">
                            <div class="flex items-center">
                                <input on:change={handleChange} id="horizontal-list-radio-license" type="radio" value="yellow" name="list-radio" class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500">
                                <label for="horizontal-list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-white">In Progress</label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 flex flex-col items-center">
                            <div class="flex items-center">
                                <input on:change={handleChange} id="horizontal-list-radio-license" type="radio" value="green" name="list-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500">
                                <label for="horizontal-list-radio-passport" class="w-full py-3 ml-2 text-sm font-medium text-white">Complete</label>
                            </div>
                        </li>
                        <li class="w-full flex flex-col items-center">
                            <div class="flex items-center">
                                <button class="relative flex z-10 p-2 focus:outline-none focus:border-blue-400">
                                    <span class="flex items-center pr-4 mt-1 text-white">Share</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 w-6 my-1 text-blue-700">
                                    <path fill="#FFFFFF" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z">
                                    </path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        
                    </ul>
                {/if}
                
            </div>
            <textarea class="font-semibold px-3 py-4 text-justify w-full -mx-2 overflow-hidden" id="content" name="content" value={article.content} rows={article.content.split('\n').length+3}/>
        </div>
    
        <div class="rounded-lg grid place-items-center align-middle mt-3 space-y-2 items-center">
            <a href="/{article.id}" role="button" class="bg-teal-600 hover:bg-teal-700 text-white rounded-md w-20 h-8 text-center py-1"> Edit </a>
            <button class="bg-cyan-600 hover:bg-cyan-700 text-white rounded-md w-20 h-8 text-center" type="submit" id={article.id}> Update </button>
            <form action="?/deleteArticle&id={article.id}" method="POST">
                <button type="submit" class="bg-red-600 hover:bg-red-700 text-white rounded-md w-20 h-8 text-center"> Delete </button>
            </form>
        </div>

    </div>
    
</form>