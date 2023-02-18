<script>
    // @ts-nocheck
        export let articles;
        let notes = articles.filter((noto) => noto.type == 'note')
        import { notos } from '../store/NotoStore';
      </script>

<div style="display: {$notos ? 'flex' : 'none'}" class="items-center p-2 m-2 bg-slate-50 rounded-2xl mt-10 space-x-4">
    <div class="flex flex-col items-center w-1/2 space-y-4">
        <header class="uppercase h-10 p-2 font-bold bg-slate-500 text-white w-1/2 text-center rounded-3xl mt-4"> {notes.length} </header>
        <p class="font-semibold"> # of Notes </p>
    </div>
    <div class="flex flex-col items-center w-1/2 space-y-4">
        <header class="uppercase h-10 p-2 font-bold bg-slate-500 text-white w-1/2 text-center rounded-3xl mt-4"> {articles.length - notes.length} </header>
        <p class="font-semibold"> # of Todos </p>
    </div>
</div>