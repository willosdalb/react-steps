import {createSlice} from '@reduxjs/toolkit';



const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0, totalPrice: 0, hasMore: 0, error: false, loading: false},
    reducers: {
        fillCart(state, action){         
            state.items = action.payload;
            state.totalQuantity = state.items.length;           
            state.totalPrice = state.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
        },
        addItem(state, action){                       
            state.items.push({
                title: action.payload.title,
                size: action.payload.size,
                color: action.payload.color,                   
                image: action.payload.image,                   
                price: action.payload.price,   
                id: action.payload.id                
            });                  
            state.totalQuantity++;
            state.hasMore++;
            state.totalPrice += action.payload.price;
            state.loading=false;
        },
        removeItem(state, action){
            // TODO: Fix remove Item
            const existingItem = state.items.find(item => item.id === action.payload);
            if(existingItem){
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalQuantity--;
                state.hasMore--;
                state.totalPrice -= existingItem.price;
            }  
            state.loading=false;                         
        },
        setHasMore(state, action){
            state.hasMore = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;