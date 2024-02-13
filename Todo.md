
## Add an error fallback. Because if a user tries to locate a store from the / search bar and the shop doesn't exist, there's no error message, redirect to 404 or whatsoever. From Code antonio

## If you missed paying your Shopify subscription bill or if a payment fails eight times, then your store is frozen until you settle your bill with Shopify. Your store doesn't freeze until your bill's due date. If your store is frozen, then you can't access your Shopify admin and customers can't view your store.

## Add a field to Profile: "subscribed bool default false" 
## When a user visits a store there must be a check on the store username[username]/page to check if that username's Profile has "Subscribed" status of "true". If subscription is false then redirect to 404 page.
## The same applies to products, fetch only products of Profiles having "Subscribed" status of "true"
## Apply this to groups too and creation of groups

The hover dev shuffle hero would be images of products which servers has more members but not yet full

Something like hottest products which has gathered more buyers but not up to the maximum members yet. This will be an attraction to make groups full

## The newMessage added in group-channel, navigation-item, group-member (which comes from SetNewMessage in use-chat-socket hook) doesn't work properly as expected. After a new message comes in the dot(notification dot) appears on the #general but doesn't show in the other areas mentioned above

## Code blocks like these have been added in those files:
  const { newMessage } = useChatSocket({
    addKey: `chat:${id}:messages`,
    updateKey: `chat:${id}:messages:update`,
    queryKey: `chat:${id}`,
  });

## Take care of the cart(cart-item.tsx) especially regarding the currency(currency.tsx)

##  Set "orderBy" alphabetically in the categories, currency and country fetching and selecting

orderBy: {
      createdAt: "desc",
    },

## Add footer, terms, privacy and error fallback 

navigation-sidebar, navigation-item, group-channel, group-member, group-sidebar

Changed redirect("/") in server-sidebar to :
``if (!server) {
    return redirect("/dashboard");
  }``

Made this kind of changes in category page, home page, and search page
{/* <ProductList title=" " items={products} loading={loading}/> */}
        <ProductList title=" " items={products.map(product => ({...product, group: {...product.group, members: []}}))} loading={loading}/>

        

