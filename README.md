git bash
git clone githuburl

>> rename the project folder
>> remove the .git folder

>>open the terminal
>>npm i || npm install

>>package.json
>>"name" : "frontend_moviestation_11-09-2024",

>>terminal
>>npm run dev
-------------------------------------------------------------------------
Fumika:
New URL :https://github.com/Fumika0523/FrontEnd_MovieStation_11-09-2024

Poonam 
URL:https://github.com/PoonamChauhan229/FrontEnd_MovieStation_11-09-2024

<!-- Add Movie -->
Uncomment the shchema
contact us , make with material ui --> Text field

All buttons are same color

<!-- Search Bar -->
Filter method, whatever the text is typing, its exist in that page?
Variable search = useState() 
Movie Array >> map
if its match >> give you a value in array >> map method

filter.map

Username:user100@gmail.com
pw: user100@gmail.com
phone no: 100100

<!-- ISSUE -->
1. Unable to add the New Movie >>> Error is not showing ? - clear <<< Change it to red color <<DONE>>
2. "The cart is empty" is not showing. <<DONE>>
3. Unable to add the movie to the cart 
4. Unable to load a ALL Movies in 1 time, (have to refresh several times) -- clear
5. NavBar when you click the button it should close automatically. same function call <<DONE>>
6. WHen you click all enquiries, the table doesnt show first
7. enquiry table is not mobile responsive
8. unable to get all enquiry in front-end (able to get in postman)

---
9. filter by order
10. Download button in pdf
11. create a html base normal website



{/* movieData is 1 data that includes all movieData,
    element is single movie data showing each data (map method) */}
    {/* isMovieOwner : compare if it's matched both element(each movie data' movieOwner id) and userId(logged in userId) >> true or false  */}
    {/* IF token and isMovieOwner are noth "true" >> show the edit & delete buttton, otherwise hide these buttons */}

>> 07/05/2025 -- Pending
icons color
not found image and text alignment
search box alignment 
search alongwith submit button (little bit difficult)
invoice part -> little time (tommorow)
search >> if a user tries found a movie(if a movie is not found explore other movies .. do check next week for "inception") 
>> developer should add that movie and trigger email to be sent out

From wish 

//////////
axios is a package >> build up for fetch
pdf doesnt accept the axios >> so need to use fetch

fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John',
    age: 30
  })
})
.then(response => response.json())
.then(data => console.log(data));


------------------------------------

async function sendData() {
  try {
    const response = await fetch('https://example.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Alice',
        age: 25
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', e)
    }
}



----
in wish cart silice, also checking if item is already in wishlist,
wishCartSlice: 
 wishAddItem: (state, action) => {
      const exists = state.wishItems.find(item => item._id === action.payload._id); }
> - This check prevents duplicate items from being added inside the Redux reducer.
> - It ensures the wishlist remains clean at the state level.


MovieDisplay_Debounce:
 const isInWishlist = wishlist?.some(item => item._id === element._id);"   ?
>- This is checking before dispatching actions, determining whether the item should be removed or added.
>his check happens outside Redux and helps decide whether to dispatch wishRemoveItem or wishAddItem.

- wishlist?.some(...) → Looks through the wishlist array.
- item => item._id === element._id → Checks if any item in wishlist has the same _id as element._id.

----------------------
1.design for delete & movin to wishlist button ----->> DONE
2.moving to wishlist function in --->>> DONE
3.moving to the cart in wishlist page
4.moviection button in cartpage
5.sorting part
6.when cart item is empty, the empty banner should show ---> DONE
7.pdf order invoice , add stroke on each item
8. price is static or not, change the price in DB and see