// @ts-nocheck
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

export const load = async ({ params }) => {
	return {
		articles: await prisma.article.findMany(),
	}
}

export const actions = {

	createArticle: async ({ request, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const { type, content } = Object.fromEntries(await request.formData());
		try {
			if (type && content) {
				await prisma.article.create({
				  data: {
					  type,
					   content,
					  userId: user.userId,
				  }
				});
			}
		} catch (err) {
		  console.error(err);
		  return fail(500, { message: "Could not create the article." });
		}
		return {
		  status: 201
		};
	},

	updateArticle: async ({ request, url, params, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const id = url.searchParams.get("id")
		if (!id) {
			return fail(400, { message: "Invalid request" })
		}
		try {
			const { type, content } = Object.fromEntries(await request.formData())
			await prisma.article.update({
				where: {
					id: Number(id),
				},
				data: {
					type,
					content,
					userId: user.userId,
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

	deleteArticle: async ({ url, locals }) => {
		const { user, session } = await locals.validateUser()
		if (!(user && session)) {
			throw redirect(302, "/")
		}
		const id = url.searchParams.get("id")
		if (!id) {
			return fail(400, { message: "Invalid request" })
		}

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: {
					id: Number(id),
				},
			})

			if (article.userId !== user.userId) {
				throw error(403, "Not authorized")
			}

			await prisma.article.delete({
				where: {
					id: Number(id),
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, {
				message: "Something went wrong deleting your article",
			})
		}

		return {
			status: 200,
		}
	},
}