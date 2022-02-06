const { assert } = require('chai');
const _deploy_contracts = require('../migrations/2_BlogFactory_deploy_contract');

const BlogFactory = artifacts.require("BlogFactory");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('BlogFactory', (accounts)=>{
    let bf

    before(async() =>{
        bf = await BlogFactory.deployed()
    })
    describe('deployment', async()=> {

        it('deploys successfully', async() =>{
            
            const address = bf.address
            console.log(address)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)

        })
    })


    describe('storage', async()=>{

        it('Creates Blogs', async()=>{
            let title;
            let content;
            title = 'Hello'
            content = 'World'
            await bf.createBlog(title,content)

            const result = await bf.getBlog(0)
            //assert.equal(result,memeHash)
        })
    })
})