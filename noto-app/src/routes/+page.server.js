// @ts-nocheck
import { prisma } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"

export const load = async () => {
	return {
		articles: await prisma.article.findMany(),
	}
}

export const actions = {
	createArticle: async ({ request }) => {
		const { type, content } = Object.fromEntries(await request.formData());
		try {
		  await prisma.article.create({
			data: {
				type:'3',
			 	content
			}
		  });
		} catch (err) {
		  console.error(err);
		  return fail(500, { message: "Could not create the article." });
		}
		return {
		  status: 201
		};
	},
	deleteArticle: async ({ url }) => {
		const id = url.searchParams.get("id")
		if (!id) {
			return fail(400, { message: "Invalid request" })
		}

		try {
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