<div className="card">
        <img className="card-img-top" src='/Images/PlantPropagation/Humid-Dome.jpg' alt={props.name} />
        <div className="card-body">
          <h4 className="card-title">{props.name}</h4>
          <p className="card-text">
            {props.description.length > 100 ? `${props.description.substring(0, 100)}...` : props.description}
          </p>
          <p className="card-text dim">
            Dimensions: {props.dimensions}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Stock<span className="float-right">{props.stock}</span>
          </li>
          <li className="list-group-item">
            <span className='price float-right'>{refinePrice()}</span>
          </li>
        </ul>
        <div className="card-body">
          <button className="card-link btn btn-light" onClick={() => props.onReadMore(props.name, `${props.description}\n\n${props.readMore}`)}>
            Read More
          </button>
          <button onClick={addToCart} className="card-link btn btn-light float-right">
            <FaShoppingCart className="to-cart"/><ImPlus/>
          </button>
        </div>
      </div>

<div className="card mb-3">
        <div className="row">
          <div className="col-md-4">
            <img
              src="/Images/PlantPropagation/Humid-Dome.jpg"
              className="card-img"
              alt={props.completeItem["name"]}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.completeItem["name"]}</h5>
              <h5 className="card-title price">{refinePrice()}</h5>
  
              <p className="card-text">
                {props.completeItem['description'].length > 200 ? `${props.completeItem['description'].substring(0, 200)}...` : props.completeItem['description']}
              </p>
              <div style={{position: 'absolute', bottom: '1rem'}}>
                <button
                  className="btn btn-sm btn-light"
                  onClick={() =>
                    props.onReadMore(
                      props.completeItem["name"],
                      `${props.completeItem["description"]}\n\n${props.completeItem["readMore"]}`
                    )
                  }
                >
                  Read More
                </button>
              </div>
              <div style={{position: 'absolute', bottom: '1rem', right: '0'}}>
                <button className="btn btn-light float-right" onClick={addToCart}>
                  <FaShoppingCart className="to-cart" />
                  <ImPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>