import { Link } from "react-router-dom";

const EmptyCartPage = () => (
  <div className="mt-5">
    <img
      src="https://w7.pngwing.com/pngs/898/961/png-transparent-wholesale-real-estate-investing-flipping-house-buy-investment-property-buyer-thumbnail.png"
      alt="cart empty"
    />
    <h1 className="mt-3">Your Cart Is Empty</h1>

    <Link to="/">
      <button type="button" className="btn btn-primary mt-2">
        Buy Now
      </button>
    </Link>
  </div>
);

export default EmptyCartPage;
