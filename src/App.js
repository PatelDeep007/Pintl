import React, { useReducer, useRef } from 'react';
import { useFetch, useInfiniteScroll, useLazyLoading } from './customHooks'
//import './index.css';
import './App.css'

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);


 
  return (
    
    <div className="">
       <div>
    <h1>Pintl</h1>
       </div>

      <div id='gallery' className={"masonry-wrapper"}>
      <div className= "masonry">
        <div className="row" data-toggle="modal" data-target="#exampleModal">
          {
            imgData.images.map((image, index) => {
            const {id, urls } = image
            return (
              <div key={index} className={"masonry-item"}>
                <div className="card-body ">
                  <img
                    alt={id}
                    data-src={urls.regular}
                    className="card-img-top"
                    src={'https://source.unsplash.com/random'}
                    data-target="#carouselExample" data-slide-to={index}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
      
      {imgData.fetching && (
        <div className="text-center bg-secondary m-auto p-3">
          <p className="m-0 text-white">Getting images</p>
        </div>
      )}
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>



  <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="carouselExample" class="carousel slide" data-ride="carousel">    
         
           {
            
            imgData.images.splice(0,1).map((image, index) => {
            const {id, urls } = image 

            return (            
                  <div class="carousel-item active">
                  <img
                    width="400px"
                    height="400px"

                    class="d-block h-100 w-100"
                    data-src={urls.regular}
                    className="card-img-top"
                    src={'https://source.unsplash.com/random'}
                    
                  />          
              </div>
            )
          })}
            {
            
            imgData.images.map((image, index) => {
            const {id, urls } = image 

            return (            
                  <div class="carousel-item">
                  <img
                    width="400px"
                    height="400px"

                    class="d-block h-100 w-100"
                    data-src={urls.regular}
                    className="card-img-top"
                    src={'https://source.unsplash.com/random'}
                    
                  />          
              </div>
            )
          })}
          <a class="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next"  href="#carouselExample" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




    </div>
  );
  

}

export default App;
