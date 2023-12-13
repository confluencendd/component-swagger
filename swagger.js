/*
SCRIPT DESTINADO A ADICIONAR O SWAGGER NAS PÁGINAS DE API


NOVO OBJETO - PARÂMETROS DA API
{
	"product": "NOME DO PRODUTO QUE A API PERTENCE",
	"pageUrl": "NOME DA PÁGINA NA URL QUE A API SERÁ INSERIDA",
	"swaggerUrl": "URL DA API NO SWAGGER"
}

*/

const apiSettings =
{
	"apis": [
		{
			product: "NDD Orbix", //Apenas para idenrificar o produto que a API pertence
			pageUrl: "api-impressoras", //Nome da página presente no final da URL, neste caso "api-impressoras" (https://helpcenter-nddorbix.ndd.tech/pt/documentacao-api/Current/api-impressoras)
			swaggerUrl: "https://developer.nddorbix.com/printer-external-integration-api/index.html", //URL do Swagger para incluir no Iframe
		},
		{
			product: "NDD Orbix",
			pageUrl: "api-estruturacao-organizacional-do-provedor",
			swaggerUrl: "https://developer.nddorbix.com/core-external-integration-api/index.html"
		},
		{
			product: "NDD Orbix",
			pageUrl: "api-de-produtos",
			swaggerUrl: "https://developer.nddorbix.com/stock-external-integration-api/index.html"
		},
		{
			product: "NDD Move",
			pageUrl: "apis-de-integracao-nddmove",
			swaggerUrl: "https://icomprova.nddcargo.com.br:9003/index.html"
		},
		{
			product: "NDD Averba",
			pageUrl: "manual-nddaverba-apis-de-integracao",
			swaggerUrl: "https://reader.nddaverba.com.br/documentation/api.html"
		}
		//O NOVO OBJETO DEVE SER INSERIDO LOGO ACIMA DESTE COMENTÁRIO
	]
}

createSwagger(apiSettings);

function createSwagger(apiSettings) {
	const currentUrl = document.URL;
	const splitUrl = currentUrl.split("/");
	const pageUrlFromSplit = splitUrl[splitUrl.length - 1];
	const secondaryPageUrl = splitUrl[splitUrl.length - 2];

	const apiMap = new Map();
	apiSettings.apis.forEach(api => {
		apiMap.set(api.pageUrl, api.swaggerUrl);
	});

	const swaggerUrl = apiMap.get(pageUrlFromSplit) || apiMap.get(secondaryPageUrl);

	if (swaggerUrl) {
		createIframe(swaggerUrl);
	} else {
		console.log("URL da API não encontrado");
	}
}

function createIframe(swaggerUrl) {
	const htmlParagraphs = Array.from(document.querySelectorAll("p"));
	const componentSwagger = htmlParagraphs.find(text => text.innerText === '{{component-swagger}}');

	if (componentSwagger) {
		const containerSwagger = document.createElement("div");
		containerSwagger.classList.add("container-swagger");
		componentSwagger.insertAdjacentElement('beforebegin', containerSwagger);
		componentSwagger.remove();

		const iframeSwagger = document.createElement("iframe");
		iframeSwagger.style.border = "1px solid #CCC";
		iframeSwagger.style.width = "100%";
		iframeSwagger.style.height = "700px";
		iframeSwagger.setAttribute("src", swaggerUrl);

		containerSwagger.appendChild(iframeSwagger);
	} else {
		console.log("Componente swagger não está incluído nesta página");
	}
}