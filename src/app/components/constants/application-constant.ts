export class ApplicationConstants {
    static readonly API_PATH = {
        login: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/signin',
        signup: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/signup',
        getuserdetails: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/get-user-detail',
        updateuser: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/update-user',
        checkadmin: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/checkifadmin',
        getproducts: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/products/getproducts',
        getvendors: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/products/getvendors',
        getcartitems: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/get-cart-items',
        getitembyid: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/products/getbyid/',
        addproduct: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/products/addproduct',
        addvendor: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/products/addvendor',
        addcomment: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/comments/add',
        addreply: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/comments/reply/',
        addtocart: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/add-product',
        removefromcart: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/remove-product',
        saveforlater: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/save-for-later',
        putback2cart: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/put-back-to-cart',
        makepayment: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/make-payment',
        loadcomment: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/comments/find/',
        myorderhistory: 'https://cors-anywhere.herokuapp.com/http://34.71.183.6:8055/cart/my-order-list'
    }
}