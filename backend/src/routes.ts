import {FastifyInstance} from 'fastify'
import {z} from 'zod'
import {prisma} from './lib/prisma'

export async function AppRoutes(server:FastifyInstance){

    // CRUD Fornecedor

    server.get('/fornecedor', async () => {        
        const fornecedor = await prisma.tbFornecedores.findMany()
    
        return fornecedor
    })
    
    server.post('/fornecedor/add', async (request) => {
        const postBody = z.object({
            nomefor: z.string(),
            email: z.string(),
            cnpjcpf: z.string(),
            telefone: z.string(),
            fisjur: z.string(),
            cep: z.string(),
            rua: z.string(),
            cidade: z.string(),
            bairro: z.string(),
            numero: z.number(),
            complemento: z.string(),
        })
    
        const {
            nomefor,
            email,
            cnpjcpf,
            telefone,
            fisjur,
            cep,
            rua,
            cidade,
            bairro,
            numero,
            complemento,
        } = postBody.parse(request.body)
    
        const newForncedor = await prisma.tbFornecedores.create({
            data: {
                nomefor,
                email,
                cnpjcpf,
                telefone,
                fisjur,
                cep,
                rua,
                cidade,
                bairro,
                numero,
                complemento,
            },
        })
    
        return newForncedor
    })        
    
    server.put('/fornecedor/update', async (request) => {
        const putBody = z.object({
            idfor: z.number(),
            nomefor: z.string(),
            fisjur: z.string(),
            cnpjcpf: z.string(),
            telefone: z.string(),
            cep: z.string(),
            cidade: z.string(),
            rua: z.string(),
            bairro: z.string(),
            numero: z.number(),
            complemento: z.string(),
            email: z.string(),
        })
    
        const {
            idfor,
            nomefor,
            fisjur,
            cnpjcpf,
            telefone,
            cep,
            cidade,
            rua,
            bairro,
            numero,
            complemento,
            email,
        } = putBody.parse(request.body)

        const fornecedorUpdated = await prisma.tbFornecedores.updateMany({
            where: {
                idfor: idfor,
            },
            data: {
                nomefor,
                fisjur,
                cnpjcpf,
                telefone,
                cep,
                cidade,
                rua,
                bairro,
                numero,
                complemento,
                email,
            },
        })
        return (fornecedorUpdated.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
    })

    server.delete('/fornecedor/delete/:idfor', async (request) => {
        const idParam = z.object({
            idfor: z.string(),
        })
    
        const { idfor } = idParam.parse(request.params)
        const fornecedorId = Number(idfor)
    
        const fornecedorDeleted = await prisma.tbFornecedores.delete({
            where: {
                idfor: fornecedorId,
            },
        })
    
        return fornecedorDeleted
    })   



    // CRUD Unidades de medidas

    server.get('/unidadeMedida', async () => {        
        const unidadeMedida = await prisma.tbUnidademedida.findMany()
    
        return unidadeMedida
    })
    
    server.post('/unidadeMedida/add', async (request) => {
        const postBody = z.object({
            siglaun: z.string(),
            nomeunidade: z.string(),
        })
    
        const {
            siglaun,
            nomeunidade,
        } = postBody.parse(request.body)
    
        const newUnidadeMedida = await prisma.tbUnidademedida.create({
            data: {
                siglaun,
                nomeunidade,
            },
        })
    
        return newUnidadeMedida
    })        
    
    server.put('/unidadeMedida/update', async (request) => {
        const putBody = z.object({
            idunidade: z.number(),
            siglaun: z.string(),
            nomeunidade: z.string()
        })
    
        const {
            idunidade,
            siglaun,
            nomeunidade
        } = putBody.parse(request.body)

        const unidadeMedidaUpdate = await prisma.tbUnidademedida.updateMany({
            where: {
                idunidade: idunidade,
            },
            data: {
                siglaun,
                nomeunidade
            },
        })
        return (unidadeMedidaUpdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
    })

    server.delete('/unidadeMedida/delete/:idunidade', async (request) => {
        const idParam = z.object({
            idunidade: z.string(),
        })
    
        const { idunidade } = idParam.parse(request.params)
        const UnidadeMedidaID = Number(idunidade)
    
        const unidadeMedidaDeleted = await prisma.tbUnidademedida.delete({
            where: {
                idunidade: UnidadeMedidaID,
            },
        })
    
        return unidadeMedidaDeleted
    }) 
    
    

    // CRUD TIPOS DE PRODUTOS

    server.get('/tiposProdutos', async () => {        
        const tiposProdutos = await prisma.tbTiposprodutos.findMany()
    
        return tiposProdutos
    })
    
    server.post('/tiposProdutos/add', async (request) => {
        const bodyData = z.object({
            nometipprod: z.string()
        })
    
        const {nometipprod} = bodyData.parse(request.body)
    
        const newTipProd = await prisma.tbTiposprodutos.create({
            data: {
                nometipprod,
            },
        })
    
        return newTipProd
    })        
    
    server.put('/tiposProdutos/update', async (request) => {
        const putBody = z.object({
            idtipprod: z.number(),
            nometipprod: z.string()
        })
    
        const {idtipprod,nometipprod} = putBody.parse(request.body)

        const tipoProdutoUpdate = await prisma.tbTiposprodutos.updateMany({
            where: {
                idtipprod: idtipprod,
            },
            data: {
                nometipprod
            },
        })
        return (tipoProdutoUpdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
    })

    server.delete('/tiposProdutos/delete/:idtipprod', async (request) => {
        const idParam = z.object({
            idtipprod: z.string(),
        })
    
        const { idtipprod } = idParam.parse(request.params)
        const tipProdId = Number(idtipprod)
    
        const tipProdDeleted = await prisma.tbTiposprodutos.delete({
            where: {
                idtipprod: tipProdId,
            },
        })
    
        return tipProdDeleted
    })
    
    // Login

    server.post('/usuario/add', async (request) => {
        const postBody = z.object({
            usu_login: z.string(),
            nome: z.string(),
            senha: z.string(),
        })

        const dtcriacao = new Date();
    
        const {
            usu_login,
            nome,
            senha,
        } = postBody.parse(request.body)
    
        const newUsuario = await prisma.tbUsuarios.create({
            data: {
                usu_login,
                nome,
                senha,
                dtcriacao
            },
        })
    
        return newUsuario
    })

    server.post('/cadastro/verifica', async (request) => {
        const verificaBody = z.object({
            usu_login: z.string(),
        })

        const {usu_login} = verificaBody.parse(request.body)
        const result = await prisma.tbUsuarios.findFirst({
            where: {
                usu_login
            }
        })
        return result // retorna null se não encontrar e o objeto se encontra
    })

    server.post('/usuario/verifica', async (request) => {
        const verificaBody = z.object({
            usu_login: z.string(),
            senha: z.string()
        })
        const {usu_login, senha} = verificaBody.parse(request.body)
        const result = await prisma.tbUsuarios.findFirst({
            where: {
                usu_login,
                senha
            }
        })
        return result // retorna null se não encontrar e o objeto se encontra
    })


    //CRUD - Produtos (Conectada a outras entidades)

    server.get('/produtos', async () => {
        const produtos = await prisma.tbProdutos.findMany()

        return produtos
    })

    server.post('/produtos/add', async (request) => {
        const putBody = z.object({
            nomeprod: z.string(),
            idtipprod: z.number(),
            idunidade: z.number(),
            quantminima: z.number()
        })

        const {
            nomeprod,
            idtipprod,
            idunidade,
            quantminima,
        } = putBody.parse(request.body)

        //Verifica se existe id de unidade
        const confereIdUnidade = await prisma.tbUnidademedida.findUnique({
            where: { idunidade: idunidade },
          });

        //Verifica se existe id de tipo do produto
        const confereIdTipoProd = await prisma.tbTiposprodutos.findUnique({
            where: { idtipprod: idtipprod },
          });

        if(confereIdTipoProd && confereIdUnidade) {
            const newProduto = await prisma.tbProdutos.create({
                data: {
                    nomeprod,
                    idtipprod,
                    idunidade,
                    quantminima
                },
            })
            return newProduto
        }
        else {
            return(`Unidade de medida ou tipo de produto não encontrados!`)
        }
    })

    server.put('/produtos/update', async (request) => {
        const putBody = z.object({
            idproduto: z.number(),
            nomeprod: z.string(),
            idtipprod: z.number(),
            idunidade: z.number(),
            quantminima: z.number()
        })
    
        const { idproduto,
                nomeprod,
                idtipprod,
                idunidade,
                quantminima} = putBody.parse(request.body)

        //Verifica se existe id de unidade
        const confereIdUnidade = await prisma.tbUnidademedida.findUnique({
            where: { idunidade: idunidade },
          });

        //Verifica se existe id de tipo do produto
        const confereIdTipoProd = await prisma.tbTiposprodutos.findUnique({
            where: { idtipprod: idtipprod },
          });    

        if(confereIdTipoProd && confereIdUnidade) {
            const produtoUpdate = await prisma.tbProdutos.updateMany({
                where: {
                    idproduto: idproduto,
                },
                data: {
                    nomeprod,
                    idtipprod,
                    idunidade,
                    quantminima
                },
            })
            return (produtoUpdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
        }
        else {
            return(`Unidade de medida ou tipo de produto não encontrados!`)
        }
    })

    server.delete('/produtos/delete/:produtoId', async (request) => {
        const idParam = z.object({
            produtoId: z.string(),
        })

        const { produtoId } = idParam.parse(request.params)

        const idproduto = Number(produtoId)

        const produtosDeleted = await prisma.tbProdutos.delete({
            where: {
                idproduto: idproduto,
            },
        })

        return produtosDeleted
    })

    // CRUD Locais de estoque

    server.get('/locaisEstoque', async () => {
        const locaisEstoque = await prisma.tbLocais.findMany()

        return locaisEstoque
    })

    server.post('/locaisEstoque/add', async (request) => {
        const bodyData = z.object({
            nomelocal : z.string()
        })

        const {nomelocal} = bodyData.parse(request.body)

        const newLocalEstoque = await prisma.tbLocais.create({
            data: {
                nomelocal
            },
        })

        return newLocalEstoque
    })

    server.put('/locaisEstoque/update', async (request) => {
        const putBody = z.object({
            idlocal : z.number(),
            nomelocal : z.string()
        })

        const {idlocal,
              nomelocal} = putBody.parse(request.body)

        const locaisUpdate = await prisma.tbLocais.updateMany({
            where: {
                idlocal : idlocal,
            },
            data: {
                nomelocal
            },
        })
        return (locaisUpdate.count >= 1) ?  'Atualização realizada com sucesso!' :  'Nada foi atualizado!'
    })

    server.delete('/locaisEstoque/delete/:LocalId', async (request) => {
        const idParam = z.object({
            LocalId: z.string(),
        })

        const { LocalId } = idParam.parse(request.params)
        const idlocal = Number(LocalId)

        const locaisDeleted = await prisma.tbLocais.delete({
            where: {
                idlocal: idlocal,
            },
        })

        return locaisDeleted
    })

    //CRUD - ESTOQUE (Conectada a outras entidades)

    server.get('/estoque', async () => {
        const estoque = await prisma.tbEstoque.findMany()
        return estoque
    })
    
    server.post('/estoque/add', async (request) => {
        const putBody = z.object({
            idproduto: z.number(),
            idlocal: z.number(),
            quantidade: z.number(),
            dtinc: z.date()
        })
    
        const {
            idproduto,
            idlocal,
            quantidade,
            dtinc
        } = putBody.parse(request.body)
    
        //Verifica se existe id do local
        const confereLocal = await prisma.tbLocais.findUnique({
            where: { idlocal: idlocal },
            });
    
            //Verifica se existe id do produto
        const confereProduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
            });
        
        if(confereLocal && confereProduto){
            const newEntry = await prisma.tbEstoque.create({
                data: {
                    idproduto,
                    idlocal,
                    quantidade,
                    dtinc
                },
            })
        
            return newEntry
        }
        else{
            return(`Produto ou local de estoque não encontrados!`)
        }
    })
    
    server.put('/estoque/update', async (request) => {
        const putBody = z.object({
            idestoque: z.number(),
            idproduto: z.number(),
            idlocal: z.number(),
            quantidade: z.number(),
            dtinc: z.date()
        })
        
        const { idestoque,
                idproduto,
                idlocal,
                quantidade,
                dtinc} = putBody.parse(request.body)
    
        //Verifica se existe id de local
        const confereLocal = await prisma.tbLocais.findUnique({
            where: { idlocal: idlocal },
            });
    
        //Verifica se existe id de tipo do produto
        const confereProduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
            });
                
        if(confereProduto && confereLocal){
            const estoqueUpdate = await prisma.tbEstoque.updateMany({
                where: {
                    idestoque: idestoque,
                },
                data: {
                    idproduto,
                    idlocal,
                    quantidade,
                    dtinc
                },
            })
            return (estoqueUpdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
        }
        else{
            return(`Produto ou local de estoque não encontrados!`)
        }

    })
    
    server.delete('/estoque/delete/:estoqueId/:prodId', async (request) => {
        const idParam = z.object({
            estoqueId: z.string(),
            prodId: z.string()
        })
    
        const { estoqueId, prodId } = idParam.parse(request.params)
    
        const idestoque = Number(estoqueId)
        const idprod = Number(prodId)
    
        const estoqueApagado = await prisma.tbEstoque.delete({
            where: {
                idestoque_idproduto: {
                    idestoque: idestoque,
                    idproduto: idprod
                },
            },
        })
    
        return estoqueApagado
    })

    // CRUD tbMovimentos

    server.get('/movimentos', async () => {
        const movimentos = await prisma.tbMovimentos.findMany()

        return movimentos
    })

    server.post('/movimentos/add', async (request) => {
        const bodyData = z.object({
            tipmov : z.string(),
            idfor: z.number(),
            idusuario_alteracao: z.number(),
            dtinc: z.date()
        })

        const {tipmov, idfor, idusuario_alteracao, dtinc} = bodyData.parse(request.body)

        const newMovimento = await prisma.tbMovimentos.create({
            data: {
                tipmov,
                idfor,
                idusuario_alteracao,
                dtinc
            },
        })

        return newMovimento
    })

    server.put('/movimentos/update', async (request) => {
        const putBody = z.object({
            idmovimento : z.number(),
            tipmov : z.string(),
            idfor: z.number(),
            idusuario_alteracao: z.number(),
            dtinc: z.date()
        })

        const {idmovimento,
            tipmov,
            idfor,
            idusuario_alteracao,
            dtinc} = putBody.parse(request.body)

        const movimentosUpdate = await prisma.tbMovimentos.updateMany({
            where: {
                idmovimento : idmovimento,
            },
            data: {
                idmovimento,
                tipmov,
                idfor,
                idusuario_alteracao,
                dtinc
            },
        })
        return (movimentosUpdate.count >= 1) ?  'Atualização realizada com sucesso!' :  'Nada foi atualizado!'
    })

    server.delete('/movimentos/delete/:movID', async (request) => {
        const idParam = z.object({
            movID: z.string(),
        })

        const { movID } = idParam.parse(request.params)
        const idmov = Number(movID)

        const movimentoDeleted = await prisma.tbMovimentos.delete({
            where: {
                idmovimento: idmov,
            },
        })

        return movimentoDeleted
    })

    //CRUD TbMovItens 
    server.get('/movimentoItens', async () => {
        const movimentosItens = await prisma.tbMovitens.findMany()

        return movimentosItens
    })

    server.post('/movimentoItens/add', async (request) => {
        const putBody = z.object({
            seqitem: z.number(),
            idmovimento: z.number(),
            idproduto: z.number(),
            idlocal: z.number(),
            dtinc: z.date(),
            quantidade: z.number()
        })

        const {
            seqitem,
            idmovimento,
            idproduto,
            idlocal,
            dtinc,
            quantidade
        } = putBody.parse(request.body)

        //Verifica se existe id do local
        const confereLocal = await prisma.tbLocais.findUnique({
            where: { idlocal: idlocal },
          });

        //Verifica se existe id do produto
        const confereProduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
          });

        //verififca se existe id da Tmovimentos
        const confereMovimentoId = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
          });

        if(confereLocal && confereProduto && confereMovimentoId){
            const newMovimentoItens = await prisma.tbMovitens.create({
                data: {
                    seqitem,
                    idmovimento,
                    idproduto,
                    idlocal,
                    dtinc,
                    quantidade
                },
            })
    
            return newMovimentoItens
        }
        else{
            return(`Local de estoque, produto ou movimento não encontrados`)
        }
    })

    server.put('/movimentoItens/update', async (request) => {
        const putBody = z.object({
            seqitem: z.number(),
            idmovimento: z.number(),
            idproduto: z.number(),
            idlocal: z.number(),
            dtinc: z.date(),
            quantidade: z.number()
        })
    
        const { seqitem,
                idmovimento,
                idproduto,
                idlocal,
                dtinc,
                quantidade} = putBody.parse(request.body)

        //Verifica se existe id de local
        const confereLocal = await prisma.tbLocais.findUnique({
            where: { idlocal: idlocal },
          });

        //Verifica se existe id de tipo do produto
        const confereProduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
          });

        //verififca se existe id da Tmovimentos
        const confereMovimentoId = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
          });

        if(confereLocal && confereProduto && confereMovimentoId){
            const movimentosItensUpdate = await prisma.tbMovitens.updateMany({
                where: {
                    seqitem: seqitem,
                    idmovimento: idmovimento,
                },
                data: {
                    seqitem,
                    idmovimento,
                    idproduto,
                    idlocal,
                    dtinc,
                    quantidade                
                },
            })
            return (movimentosItensUpdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
        }
        else{
            return(`Local de estoque, produto ou movimento não encontrados!`)
        }
    })

    server.delete('/movimentoItens/delete/:idmovimento/:seqitem/:idproduto', async (request) => {
        const idParam = z.object({
            idmovimento: z.string(),
            seqitem: z.string(),
            idproduto: z.string()

        })

        const { idmovimento, seqitem, idproduto  } = idParam.parse(request.params)

        const seqItem = Number(seqitem)

        const idMovimento = Number(idmovimento)

        const idProduto = Number(idproduto)

        const movimentoItemDeleted = await prisma.tbMovitens.delete({
            where: {
                idmovimento_seqitem_idproduto:
                {
                    idmovimento: idMovimento,
                    seqitem: seqItem,
                    idproduto: idProduto
                },
            },
        })

        return movimentoItemDeleted
    })


    //CRUD TB NF

    server.get('/nf', async () => {
        const nf = await prisma.tbNf.findMany()
        return nf
    })
    
    server.post('/nf/add', async (request) => {
        const putBody = z.object({
            numnf: z.number(),
            idmovimento: z.number(),
            serienf: z.number(),
            idfor: z.number(),
            idusuario_inclusao: z.number(),
            dtemissao: z.date(),
            vlrtotal: z.number(),
            observacao: z.string()
        })
    
        const {
            numnf,
            idmovimento,
            serienf,
            idfor,
            idusuario_inclusao,
            dtemissao,
            vlrtotal,
            observacao //ADICIONAR ESSE CAMPO
        } = putBody.parse(request.body)
    
        //Verifica se existe id do local
        const conferemovimento = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
            });
    
            //Verifica se existe id do produto
        const confereuser = await prisma.tbUsuarios.findUnique({
            where: { idusuario: idusuario_inclusao },
            });

        const conferefornecedor = await prisma.tbFornecedores.findUnique({
            where: { idfor: idfor },
            });
        
        if(conferemovimento && confereuser && conferefornecedor){
            const newNf = await prisma.tbNf.create({
                data: {
                    numnf,
                    idmovimento,
                    serienf,
                    idfor,
                    idusuario_inclusao,
                    dtemissao,
                    vlrtotal
                },
            })
        
            return newNf
        }
        else{
            return(`Movimento, usuário ou fornecedor não encontrados!`)
        }
    })
    
    server.put('/nf/update', async (request) => {
        const putBody = z.object({
            idnf: z.number(),
            numnf: z.number(),
            idmovimento: z.number(),
            serienf: z.number(),
            idfor: z.number(),
            idsuario_inclusao: z.number(),
            dtemissao: z.date(),
            vlrtotal: z.number()
        })
        
        const { idnf,
                numnf,
                idmovimento,
                serienf,
                idfor,
                idsuario_inclusao,
                dtemissao,
                vlrtotal} = putBody.parse(request.body)
    
        //Verifica se existe id de local
        const conferemovimento = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
            });
    
            //Verifica se existe id do produto
        const confereuser = await prisma.tbUsuarios.findUnique({
            where: { idusuario: idsuario_inclusao },
            });

        const conferefornecedor = await prisma.tbFornecedores.findUnique({
            where: { idfor: idfor },
            });
        
        if(conferemovimento && confereuser && conferefornecedor){
            const nfupdate = await prisma.tbNf.updateMany({
                where: {
                    idnf: idnf
                },
                data: {
                    numnf,
                    idmovimento,
                    serienf,
                    idfor,
                    idsuario_inclusao,
                    dtemissao,
                    vlrtotal
                },
            })
            return (nfupdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
        }
        else{
            return(`Movimento, usuário ou fornecedor não encontrados!`)
        }

    })
    
    server.delete('/nf/delete/:nfId', async (request) => {
        const idParam = z.object({
            idnf: z.string(),
        })
    
        const { idnf } = idParam.parse(request.params)
    
        const nfid = Number(idnf)
    
        const nfapagada = await prisma.tbNf.delete({
            where: {
                idnf: nfid,
            },
        })
    
        return nfapagada
    })





    //CRUD TB NFITENS

    server.get('/nfitens', async () => {
        const nfitem = await prisma.tbNf.findMany()
        return nfitem
    })
    
    server.post('/nfitens/add', async (request) => {
        const putBody = z.object({
            idnf: z.number(),
            idmovimento: z.number(),
            seqitem: z.number(),
            idproduto: z.number(),
            vlrunitario: z.number(),
            quantidade: z.number(),
            vlrtotitem: z.number(),
        })
    
        const {
            idnf,
            idmovimento,
            seqitem,
            idproduto,
            vlrunitario,
            quantidade,
            vlrtotitem //ADICIONAR ESSE CAMPO
        } = putBody.parse(request.body)
    
        //Verifica se existe id do local
        const conferenf = await prisma.tbNf.findUnique({
            where: { idnf: idnf },
            });
    
            //Verifica se existe id do produto
        const conferemovimento = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
            });

        const confereproduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
            });
        
        if(conferenf && conferemovimento && confereproduto){
            const newNfitem = await prisma.tbNfitens.create({
                data: {
                    idnf,
                    idmovimento,
                    seqitem,
                    idproduto,
                    vlrunitario,
                    quantidade,
                    vlrtotitem
                },
            })
        
            return newNfitem
        }
        else{
            return(`Nota fiscal, movimento ou produto não encontrados!`)
        }
    })
    
    server.put('/nfitens/update', async (request) => {
        const putBody = z.object({
            idnf: z.number(),
            idmovimento: z.number(),
            seqitem: z.number(),
            idproduto: z.number(),
            vlrunitario: z.number(),
            quantidade: z.number(),
            vlrtotitem: z.number(),
        })
        
        const { 
            idnf,
            idmovimento,
            seqitem,
            idproduto,
            vlrunitario,
            quantidade,
            vlrtotitem
        } = putBody.parse(request.body)
    
        //Verifica se existe id de local
        const conferenf = await prisma.tbNf.findUnique({
            where: { idnf: idnf },
            });
    
        //Verifica se existe id do produto
        const conferemovimento = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
            });

        const confereproduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
            });
        
        if(conferenf && conferemovimento && confereproduto){
            const nfupdate = await prisma.tbNfitens.updateMany({
                where: {
                    idnf: idnf,
                    seqitem: seqitem,
                    idproduto: idproduto
                },
                data: {
                    idmovimento,
                    vlrunitario,
                    quantidade,
                    vlrtotitem
                },
            })
            return (nfupdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
        }
        else{
            return(`Nota fiscal, movimento ou produto não encontrados!`)
        }

    })
    
    server.delete('/nfitens/delete/:nfId/:seqitem/:produtoId', async (request) => {
        const idParam = z.object({
            idnf: z.string(),
            seqitem: z.string(),
            idproduto: z.string()
        })
    
        const { idnf, seqitem, idproduto } = idParam.parse(request.params)
    
        const nfid = Number(idnf)
        const seqItem = Number(seqitem)
        const idProduto = Number(idproduto)
    
        const itemapagado = await prisma.tbNfitens.delete({
            where: {
                idnf_seqitem_idproduto:{
                    idnf: nfid,
                    seqitem: seqItem,
                    idproduto: idProduto
                },
            },
        })
    
        return itemapagado
    })

    //CRUD TB PROD COMPOSICAO


    
    server.get('/composicao', async () => {
        const composicoes = await prisma.tbProdcomposicao.findMany()
        return composicoes
    })
    
    server.post('/composicao/add', async (request) => {
        const putBody = z.object({
            idproduto: z.number(),
            idprodutocomp: z.number(),
            quantidade: z.number(),
        })
    
        const {
            idproduto,
            idprodutocomp,
            quantidade //ADICIONAR ESSE CAMPO
        } = putBody.parse(request.body)
        
        const produtos = [idproduto, idprodutocomp]
            //Verifica se existe id do produto
        const confereprodutos = await prisma.tbProdutos.findMany({
            where: {
                idproduto: {
                    in: produtos
                }
            },
            });
        
        if(confereprodutos.length === produtos.length){
            const newComp = await prisma.tbProdcomposicao.create({
                data: {
                    idproduto: idproduto,
                    idprodutocomp: idprodutocomp,
                    quantidade: quantidade
                },
            })
        
            return newComp
        }
        else{
            return(`Produtos não encontrados!`)
        }
    })
    
    server.put('/nfitens/update', async (request) => {
        const putBody = z.object({
            idnf: z.number(),
            idmovimento: z.number(),
            seqitem: z.number(),
            idproduto: z.number(),
            vlrunitario: z.number(),
            quantidade: z.number(),
            vlrtotitem: z.number(),
        })
        
        const { 
            idnf,
            idmovimento,
            seqitem,
            idproduto,
            vlrunitario,
            quantidade,
            vlrtotitem
        } = putBody.parse(request.body)
    
        //Verifica se existe id de local
        const conferenf = await prisma.tbNf.findUnique({
            where: { idnf: idnf },
            });
    
        //Verifica se existe id do produto
        const conferemovimento = await prisma.tbMovimentos.findUnique({
            where: { idmovimento: idmovimento },
            });

        const confereproduto = await prisma.tbProdutos.findUnique({
            where: { idproduto: idproduto },
            });
        
        if(conferenf && conferemovimento && confereproduto){
            const nfupdate = await prisma.tbNfitens.updateMany({
                where: {
                    idnf: idnf,
                    seqitem: seqitem,
                    idproduto: idproduto
                },
                data: {
                    idmovimento,
                    vlrunitario,
                    quantidade,
                    vlrtotitem
                },
            })
            return (nfupdate.count >= 1) ?  'Atualização com sucesso' :  'Nada foi atualizado'
        }
        else{
            return(`Nota fiscal, movimento ou produto não encontrados!`)
        }

    })
    
    server.delete('/nfitens/delete/:nfId/:seqitem/:produtoId', async (request) => {
        const idParam = z.object({
            idnf: z.string(),
            seqitem: z.string(),
            idproduto: z.string()
        })
    
        const { idnf, seqitem, idproduto } = idParam.parse(request.params)
    
        const nfid = Number(idnf)
        const seqItem = Number(seqitem)
        const idProduto = Number(idproduto)
    
        const itemapagado = await prisma.tbNfitens.delete({
            where: {
                idnf_seqitem_idproduto:{
                    idnf: nfid,
                    seqitem: seqItem,
                    idproduto: idProduto
                },
            },
        })
    
        return itemapagado
    })



}