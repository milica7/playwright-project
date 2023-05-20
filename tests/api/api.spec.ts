import {test, expect} from  "@playwright/test"

test.describe.parallel("API testing", ()=> {
    const baseUrl = 'https://reqres.in/api'

    test("Simple API Test - Assert Response Status",async ({request}) => {
        const response = await request.get(`${baseUrl}/users/2`)
        await expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test("Simple API Test - Assert Invalid Endpoint",async ({request}) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        await expect(response.status()).toBe(404)
    })

    test("GET Request - Get User Detail", async ({request})=>{
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse( await response.text())

        await expect(response.status()).toBe(200)
        await expect(responseBody.data.id).toBe(1)
        await expect(responseBody.data.first_name).toBe('George')
        await expect(responseBody.data.last_name).toBe('Bluth')
        await expect(responseBody.data.email).toBeTruthy
    })

    test("POST Request = Create New User", async ({request})=>{
        const response = await request.post(`${baseUrl}/user`, {
            data:{
                id:1000
            }
        })
        const responseBody = JSON.parse( await response.text())
        await expect(response.status()).toBe(201)
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("POST Request - Login", async ({request})=>{
        const response = await request.post(`${baseUrl}/login`,{
            data: {
                email:'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })
        const responseBody = JSON.parse(await response.text())
        await expect(response.status()).toBe(200)
        await expect(responseBody.token).toBeTruthy
    })

    test("POST Request = Login Fail", async ({request})=>{
        const response = await request.post(`${baseUrl}/login`,{
            data: {
                email:'eve.holt@reqres.in',
            }
        })
        const responseBody = JSON.parse(await response.text())
        await expect(response.status()).toBe(400)
        await expect(responseBody.error).toBe('Missing password')
    })

    test("PUT Request - Update User", async({request})=>{
        const response = await request.put(`${baseUrl}/users/1`,{
            data:{
                name:"new name",
                job: "new job"
            }
        })
        const responseBody = JSON.parse(await response.text())
        await expect(response.status()).toBe(200)
        await expect(responseBody.name).toBe('new name')
        await expect(responseBody.job).toBe('new job')
    })

    test("Delete Request - Delete User", async({request})=>{
        const response = await request.delete(`${baseUrl}/users/1000`)
        await expect(response.status()).toBe(204)

    })
})