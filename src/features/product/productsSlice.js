import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter({})
const initialState = productsAdapter.getInitialState({
    status: "idle",
    error: null
})

export const fetchPoducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch("https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/")
    const data = await res.json()
    return data
})

export const addProduct = createAsyncThunk("products/add", async (product) => {
    const res = await fetch(
        "https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }
    )

    const data = await res.json()

    return { ...product, ...data }
})

export const updateProduct = createAsyncThunk("products/update", async (product, { getState }) => {
    const { id } = product;
    const existingProduct = selectProductById(getState(), id)

    if (!existingProduct) {
        return new Error("Unable to find product")
    }

    product.id = undefined

    const res = await fetch(
        `https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/${id}`,
        {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(product)
        }
    )

    return { ...product, id }
})

export const deleteProduct = createAsyncThunk("products/delete", async (id, {getState}) => {
    const existingProduct = selectProductById(getState(), id)

    if (!existingProduct) {
        return new Error("Unable to find product")
    }

    const res = await fetch(
        `https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/${id}`,
        { method: "DELETE" }
    )

    return id
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchPoducts.fulfilled, (state, action) => {
                state.status = "succeeded"
                productsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchPoducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "unable to load products"
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                productsAdapter.addOne(state, action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                console.log(action.error.message)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                // state.entities[action.payload.id] = action.payload
                productsAdapter.updateOne(state, action.payload)
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                productsAdapter.removeOne(state, action.payload)
            })
    }
})

export const {
    selectAll: selectAllProducts,
    selectIds: selectAllProductsIds,
    selectById: selectProductById,
} = productsAdapter.getSelectors(state => state.products)


export const productsReducer = productsSlice.reducer
