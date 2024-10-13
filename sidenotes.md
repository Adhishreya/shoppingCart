### Option 1
- Adding or removing item from cart based on the fetched data from the database and cached might lead to a descrepancy between the database and the cache when multiple users are operating on the same item simultaneously.
- one option to mitigate this is hitting the database every time a request is made in the frontend.
  - this is not a good option as it will slow down the frontend.
- the other option is to cache the data in the frontend and update the cache when the database is updated.

### Option 2
- To mitigate the lack of session management when the user is not logged in, we can allow the user to add to the cart only if they are logged in.

### Option 3
- redux can be used to manage the state of the application.

### Option 4
- the cartId store it in the react store/session and every time an increment on a product is done the call the corresponding actions.


Todo
- handle the case when the user is not logged in and the cart is empty.
- orders and rating


Done
- handle on logged in the cart should autopopulate and not just by navigating to the cart endpoint
- the add buttons in the landing page also must be modified


ToDo

signed in user stored in the redux store 
search shoud fetch from server not local storage
upload image facility for all places including product images
rating 



Extra design : 
- Users should get notifications whenever there is a change in the order or shipping status.
- Users should be able to pay through credit cards or electronic bank transfer.
- Users should be able to track their shipment to see the current state of their order.
- Add a new product category.
- Send notifications to members with shipment updates.
- Users should be able to search for products by their name or category.
