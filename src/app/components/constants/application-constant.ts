export class ApplicationConstants {
    static readonly API_PATH = {
        login: 'http://localhost:8055/login',
        signup: 'http://localhost:8055/signup',
        getuserdetails: 'http://localhost:8055/get-user-detail',
        updateuser: 'http://localhost:8055/update-user',
        checkadmin: 'http://localhost:8055/checkifadmin',
        getproducts: 'http://localhost:8055/products/getproducts',
        getvendors: 'http://localhost:8055/products/getvendors',
        getcartitems: 'http://localhost:8055/cart/get-cart-items',
        getitembyid: 'http://localhost:8055/products/getbyid/',
        addproduct: 'http://localhost:8055/products/addproduct',
        addvendor: 'http://localhost:8055/products/addvendor',
        addcomment: 'http://localhost:8055/comments/add',
        addreply: 'http://localhost:8055/comments/reply/',
        addtocart: 'http://localhost:8055/cart/add-product',
        removefromcart: 'http://localhost:8055/cart/remove-product',
        saveforlater: 'http://localhost:8055/cart/save-for-later',
        putback2cart: 'http://localhost:8055/cart/put-back-to-cart',
        makepayment: 'http://localhost:8055/cart/make-payment',
        loadcomment: 'http://localhost:8055/comments/find/',
        myorderhistory: 'http://localhost:8055/cart/my-order-list'
    }
}