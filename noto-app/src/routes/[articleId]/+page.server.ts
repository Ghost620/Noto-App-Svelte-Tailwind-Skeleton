import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ params }) => {
	const getArticle = async () => {
		const article = await prisma.article.findUnique({
			where: {
				id: Number(params.articleId),
			},
		})
		if (!article) {
			throw error(404, "Article not found")
		}
		return article
	}

	return {
		article: getArticle(),
	}
}

export const actions: Actions = {
	updateArticle: async ({ request, params, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const { content } = Object.fromEntries(await request.formData()) as {
			title: string
			content: string
		}

		try {
			await prisma.article.update({
				where: {
					id: Number(params.articleId),
				},
				data: {
					content,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not update article" })
		}

		return {
			status: 200,
		}
	},
}