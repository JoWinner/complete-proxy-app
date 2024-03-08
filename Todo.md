
## Add an error fallback. Because if a user tries to locate a store from the / search bar and the shop doesn't exist, there's no error message, redirect to 404 or whatsoever. From Code antonio



TODO: Add next/video to display videos sent in messages
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

        

