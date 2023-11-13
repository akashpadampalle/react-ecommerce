import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { selectProductById } from "../product/productsSlice";

const cartAdapter = createEntityAdapter({})

const initialState = cartAdapter.getInitialState({
    status: "idle",
    error: null,
})

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
    const res = await fetch("https://my-json-server.typicode.com/akashpadampalle/FakeApi/cart/")
    const data = await res.json()
    return data
})

export const addItemToCart = createAsyncThunk("cart/add", async (item, { getState }) => {
    const product = selectProductById(getState(), item.id)

    if (!product) {
        return new Error("unble to add product into cart")
    }

    await fetch(
        "https://my-json-server.typicode.com/akashpadampalle/FakeApi/cart/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        }
    )
    return item
})

export const updateCartItem = createAsyncThunk("cart/update", async (item, { dispatch, getState }) => {
    const existingProduct = selectProductById(getState(), item.id)
    const existringItem = selectCartItemById(getState(), item.id)

    if (!existingProduct || !existringItem) {
        return new Error("something wend wrong")
    }

    if (item.quantity <= 0) {
        return dispatch(deleteCartItem(item.id))
    }

    await fetch(
        `https://my-json-server.typicode.com/akashpadampalle/FakeApi/cart/${id}`,
        {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(item)
        }
    )

    return item
})

const deleteCartItem = createAsyncThunk("products/delete", async (id, { getState }) => {

    const cartItem = selectCartItemById(getState(), id)

    if (!cartItem) {
        return new Error("Unable to delete")
    }

    await fetch(
        `https://my-json-server.typicode.com/akashpadampalle/FakeApi/cart/${id}`,
        { method: "DELETE" }
    )

    return id
})


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.error = null
                cartAdapter.setAll(state, action.payload)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "enable to load cart"
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                cartAdapter.addOne(state, action.payload)
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                if (action.payload.quantity && action.payload.quantity > 0) {
                    cartAdapter.updateOne(state, action.payload)
                }
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                cartAdapter.removeOne(state, action.payload)
            })
    }
})


export const cartReducer = cartSlice.reducer
export const {
    selectAll: selectCartItems,
    selectById: selectCartItemById
} = cartAdapter.getSelectors(state => state.cart)