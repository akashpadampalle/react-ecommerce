import { createAsyncThunk, createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { deleteCartItem } from "../cart/cartSlice";

const productsAdapter = createEntityAdapter({})
const initialState = productsAdapter.getInitialState({
    status: "idle",
    error: null
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addOneProduct: (state, action) => {
            productsAdapter.addOne(state, action.payload)
        },
        removeOneProduct: (state, action) => {
            productsAdapter.removeOne(state, action.payload)
        },
        updateOneProduct: (state, action) => {
            productsAdapter.setOne(state, action.payload)
        } 
    },
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
            // .addCase(deleteProduct.fulfilled, (state, action) => {
            //     productsAdapter.removeOne(state, action.payload)
            // })
            // .addCase(updateProduct.fulfilled, (state, action) => {
            //     productsAdapter.setOne(state, action.payload)
            // })
            // .addCase(addProduct.fulfilled, (state, action) => {
            //     console.log(state)
            //     productsAdapter.addOne(state, action.payload)
            // })
        // .addCase(addProduct.rejected, (state, action) => {
        //     console.log(action.error.message)
        // })
    }
})


const { addOneProduct, removeOneProduct, updateOneProduct } = productsSlice.actions

export const {
    selectAll: selectAllProducts,
    selectIds: selectAllProductsIds,
    selectById: selectProductById,
    selectEntities: selectProductEntities
} = productsAdapter.getSelectors(state => state.products)

export const productsReducer = productsSlice.reducer



// thunks

export const fetchPoducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch("https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/")
    const data = await res.json()
    return data
})

export const addProduct = createAsyncThunk("products/add", async (product, { dispatch }) => {

    const id = nanoid()

    dispatch(addOneProduct({...product, id}))

    try {

        await fetch(
            "https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            }
        )

    } catch (error) {
        console.log(error)
        dispatch(removeOneProduct(id))

    }
    return {...product, id}

})

export const updateProduct = createAsyncThunk("products/update", async (product, { getState, dispatch }) => {
    const { id } = product;
    const existingProduct = selectProductById(getState(), id)

    if (!existingProduct) {
        return new Error("Unable to find product")
    }

    dispatch(updateOneProduct(product))   

    try{
        await fetch(
            `https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/${id}`,
            {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(product)
            }
        )
    } catch (error) {
        console.log(error)
        dispatch(updateOneProduct(existingProduct))
    }
    
})

export const deleteProduct = createAsyncThunk("products/delete", async (id, { getState, dispatch }) => {
    const existingProduct = selectProductById(getState(), id)

    if (!existingProduct) {
        return new Error("Unable to find product")
    }

    dispatch(removeOneProduct(id))
    dispatch(deleteCartItem(id))

    try {
        await fetch(
            `https://my-json-server.typicode.com/akashpadampalle/FakeApi/products/${id}`,
            { method: "DELETE" }
        )
    } catch (error) {
        console.log(error)
        dispatch(addOneProduct(existingProduct))
    }

})