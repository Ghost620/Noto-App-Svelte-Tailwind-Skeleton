<script>
// @ts-nocheck
    export let article;
  </script>

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