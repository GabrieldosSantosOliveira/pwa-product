import {
  Routes as RoutesReactRouter,
  Route
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { AddProducts } from './screens/AddProduct';
import { Home } from './screens/Home';
import { Map } from './screens/Map';
import { Offline } from './screens/Offline';
import { Products } from './screens/Products';
export const Routes = () => {
  return (
    <RoutesReactRouter>
      <Route path="/" element={<Home />} />
      <Route path="/offline" element={<Offline />} />
      <Route element={<AuthProvider />}>
        <Route element={<PrivateRoute redirectTo="/" />}>
          <Route path="/products" element={<Products />} />
          <Route
            path="/create-products"
            element={<AddProducts />}
          />

          <Route path="/map" element={<Map />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </RoutesReactRouter>
  );
};
