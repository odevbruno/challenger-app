deploy:
	npm run build
	vercel .

deploy-prod:
	npm run build
	vercel --prod