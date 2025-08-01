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
9. filter by order <<DONE>>
10. Download button in pdf <<DONE>>
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



README FILE:
AUTHENTICATION:
SIGININ /SIGNUP /LOGOUT FUNCTIONLITY                    -DONE
ValidationSchema + Errors -FORM                         -DONE (COMMON SCHEMA)(MENTION SAMPLE SIGNUP/SIGNIN USER IN README)

WITHOUT AUTHENTICATION
ALL MOVIES -GET REQUEST                                  -DONE
NO EDIT/DELETE/UPDATE ACCESS                             -DONE
SEARCH FUNCTIONALITY                                     -DONE
SEE ALL ENQUIRES                                         -DONE
ALL NAVIGATION                                           -DONE

CONTACT FORM SUBMISSION + TABLE (ADDED+VIEW)             -DONE 
CARTPAGE ACCESSIBLITY(TOKEN)                             -DONE
MYMOVIES/MYPURCHASE   PAGE+ICON ACCESSIBLITY + DONT SHOW -DONE 
CART/WISHLIST FUNCTIONLITY                               -PENDING(NOT DONE)-POONAM-MONDAY

WITH AUTHENTICATION
ALL MOVIES -GET REQUEST                                 -DONE
NO EDIT/DELETE/UPDATE ACCESS                            -DONE
SEARCH FUNCTIONALITY                                    -DONE
SEE ALL ENQUIRES                                        -DONE
ALL NAVIGATION                                          -DONE
ADD MOVIE                                               -DONE
EDIT MOVIE                                              -DONE
UPDATE MOVIE                                            -DONE
DELETE MOVIE                                            -DONE
ADD|REMOVE -WISHCART                                    -DONE
ADD - CART                                              -DONE
WISHLIST NAVIGATION                                     -DONE

WISHLIST
  >>ADD TO WISHLIST                                         -Done 
  >>REMOVE TO WISHLIST                                      -Done 
  >>DISPLAY IN ACTION BUTTONS                               -Done 
  >>VISIBLE DISPLAY IN WISHLIST DISPLAY PAGE                -Done 
  >>REMOVE ITEM FORM WISHLIST DISPLAY   PAGE                -Done 
  >>MOVE TO CART TO WISHLIST DISPLAY    PAGE                -Done

CART
  >>ADD TO CART
  >>DISPLAY IN ACTION BUTTONS
  >>VISIBLE DISPLAY IN WISHLIST DISPLAY PAGE                -Done
  >>REMOVE ITEM FORM CART  PAGE                             -Done
  >>MOVE TO ITEMS TO WISHLIST FROM CART PAGE                -Done



ORDER SUMMARY
  >>DISPLAY ORDERS                          -Done 
  >>SORTING ORDERS                                  -Done 
  >>DELIVERED || PROCESSING STAGE 
  >>TOTAL PRICE CALCULATED CORRECTLY              -Done 
  >>DOWNLOAD INVOICE                                -Done 
  >>INVOICE TOTAL PRICE MISMATCH                  -Done 
  >>UI DESIGN FOR INVOICE                           -ERROR 
  >>RETURN TO TOP/ BACK BUTTON                      -DONE
  >>ADD PAGINATION TO ORDER SUMMARY (3)             -PENDING   

ENQUIRIES
  >>ADD PAGINATION TO TABLE                       -PENDING   >> No button, add previous and next.
  >> order page , pagination for 2 order


>> PAYMENT GATEWAY
>> GOOGLE/FACEBOOK LOGIN
>> ADMIN PANEL 

STUDENT MANAGEMENT >> USER PROFILE >> EDIT >> GOOGLE -GMAIL



BLOG APPLICATION  -CRUD
NEWS APPLICATIONS -API FETCHING FROM RANDOM RESOURCES >>> CRUD
RECIPE SEARCH     - CRUD +SEARCH
ECOMM -CRUD + ADD TO CART > REMOVE FROM CART
AUTHENTICATION SYSTEM >> SIGIN-SIGNOUT
CONTACT MANAGER 
FORM VALIDATOR >>BEFORE AND AFTER SUBMIT 


REFRESH



Validation Before Submit:
validationSchema works for you

Validation After Submit:>> Backend works
Sigin
1-ID ,Phone Number & Password >> Successful Login >> Authentication
2-ID ,Phone Number & Password  >> Missing >>Throw Error (Worst case >> Not aware /lack of tech)
technology Wise:
3-ID -isincorrect
4-Phone Number -incorrect
5-Password -incorrect
>> Valid Error >> Axios call fail >> Message >>

All the forms