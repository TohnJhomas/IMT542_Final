const utils = require('./utils');
const axios = require('axios');

// Mock axios for unit tests
jest.mock('axios');

describe('getPageByName', () => {
    it('should return error if no results', () => {
        utils.findPagesByName = jest.fn().mockResolvedValue([]);
        return expect(utils.getPageByName('Nonexistent')).resolves.toEqual({ error: 'No results found', status: 404 });
    });

    it('should return results if found', () => {
        const mockBindings = [
            {
                entity: {
                type: "uri",
                value: "http://dbpedia.org/resource/Product-service_system",
                },
                comment: {
                type: "literal",
                "xml:lang": "en",
                value:
                    "Product-service systems (PSS) are business models that provide for cohesive delivery of products and services. PSS models are emerging as a means to enable collaborative consumption of both products and services, with the aim of pro-environmental outcomes.",
                },
                label: {
                type: "literal",
                "xml:lang": "en",
                value: "Product-service system",
                },
            }
        ];
        utils.findPagesByName = jest.fn().mockResolvedValue(mockBindings);
        return expect(utils.getPageByName('Product')).resolves.toContainEqual(mockBindings);
    });
});

describe('getResourceFromUri', () => {
    it('should return property bindings for a valid URI', async () => {
        const mockBindingLabel = [
            {
                property: {
                type: 'uri',
                value: 'http://www.w3.org/2000/01/rdf-schema#label'
                },
                hasValue: {
                type: 'literal',
                'xml:lang': 'en',
                value: 'Product-service system'
                }
            }
        ];
        const mockBindingAbstract = [
            {
                property: { type: 'uri', value: 'http://dbpedia.org/ontology/abstract' },
                hasValue: {
                type: 'literal',
                'xml:lang': 'en',
                value: 'Product-service systems (PSS) are business models that provide for cohesive delivery of products and services. PSS models are emerging as a means to enable collaborative consumption of both products and services, with the aim of pro-environmental outcomes.'
                }
            }
        ]
        utils.queryDbpedia = jest.fn().mockResolvedValue({ results: { bindings: mockBindings } });

        const results = await utils.getResourceFromUri('http://dbpedia.org/resource/Product-service_system');
        expect(results).toContainEqual(mockBindingLabel);
        expect(results).toContainEqual(mockBindingAbstract);
    });
});

describe('rdfToMarkdownGrouped', () => {
    it('should convert RDF results to Markdown', () => {
        const mockResults = [
            { property: { value: 'http://www.w3.org/2000/01/rdf-schema#label' }, hasValue: { value: 'Product' } },
            { property: { value: 'http://www.w3.org/2000/01/rdf-schema#abstract' }, hasValue: { value: 'A product is...' } }
        ];
        const [label, markdown] = utils.rdfToMarkdownGrouped(mockResults);
        expect(markdown).toContain('# Product');
        expect(markdown).toContain('## Abstract');
    });
});

