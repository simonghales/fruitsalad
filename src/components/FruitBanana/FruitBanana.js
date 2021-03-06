import React, {Component} from 'react';
import './FruitBanana.css';
import classNames from 'classnames';
import Fruit from '../Fruit/Fruit';

const FruitBanana = ({
                       action = '',
                       name = '',
                       image = '',
                       showAction = false,
                       showName = true,
                       showPoints = false,
                       size = 'default',
                     }) => {
  return (
    <Fruit size={size}>
      <svg className={classNames([
        'FruitBanana',
        {
          'FruitBanana--showAction': showAction,
          'FruitBanana--showName': showName,
          'FruitBanana--showPoints': showPoints,
        }
      ])} viewBox='0 0 1643 2633' xmlns='http://www.w3.org/2000/svg'>

        <g fill='none' fillRule='evenodd'>
          <path
            d='M549.317 2630.234c140.87 50.06 92.67-770.63 290.344-818.607-154.205 255.02 18.036 785.577 174.89 785.577 156.853 0-66.942-459.059 348.575-1037.01 108.827-189.87-153.244-404.356-397.202-404.356-243.96 0-597.5 528.091-630.298 793.557-32.797 265.465 120.741 647.809 213.691 680.84z'
            fill='#EFDB81'/>
          <path
            d='M512.513 2602.828C485.77 2556.1 471 2504.81 471 2451c0-144.65 51.074-69.731 172.843-3.241-21.153 117.642-47.145 199.313-94.526 182.475-11.497-4.085-23.92-13.515-36.804-27.406zm673.264-721.532c-165.538 417.992-44.867 715.908-171.227 715.908-38.962 0-78.874-32.737-114.496-85.855 166.047-29.015 188.482-523.228 285.723-630.053zM884.17 1173.09c28.158-11.176 55.586-17.252 81.754-17.252 243.958 0 506.03 214.487 397.202 404.356-46.527 64.715-85.038 127.939-116.965 189.195-184.169-176.666-355.961-447.804-361.991-576.3z'
            fill='#DCC58B'/>
          <path
            d='M955.98 1322.319c151.557 334.022 447.645 577.686 686.332 524.81-86.873-191.063-339.17-334.907-244.807-1027.33-17.38-374.524-287.492-701.237-389.997-701.237s-296.33 288.61-296.33 629.922C701.748 1504.852-44.397 1789.32 56.092 1771.243c439.133-78.99 794.99-263.981 899.888-448.924z'
            fill='#EECD82'/>
          <path
            d='M902.98 1312.319c151.557 334.022 592.928 625.925 714.658 523.233-103.758-191.443-302.63-394.745-273.133-1025.753-17.38-374.524-241.752-693.534-344.257-693.534s-342.07 280.907-342.07 622.22c-9.431 756.367-703.115 926.23-655.087 1022.758 70.247 141.181 794.99-263.981 899.888-448.924z'
            fill='#FFF461'/>
          <path
            d='M1000.248 173.306c176.502 117.892 226.594 401.732 306.76 702.582 70.138 739.62 204.011 899.624 310.63 959.664-103.758-191.443-302.63-394.745-273.133-1025.753-17.38-374.524-241.752-693.534-344.257-693.534s-342.07 280.907-342.07 622.22c-9.431 756.367-703.115 926.23-655.087 1022.758 29.005-12.618 368.748-162.616 593.028-554.261C809.27 342.9 931.422 178.372 1000.248 173.306z'
            fill='#FDF880'/>
          <path
            id='peelPath'
            d='M121.92 1548.938c162.789-68.35 305.465-210.612 413.994-421.267 55.643-108.004 63.184-399.192 99.218-540.998 87.451-344.149 200.007-360.518 160.353-376.141-81.896-32.266-276.408 263.378-318.45 517.678-42.04 254.3-66.05 385.672-151.236 531.968-85.186 146.296-333.385 343.134-203.88 288.76z'
            fill='none'/>
          <path
            id='pointsPath'
            d='M693.409 247.436c102.9-163.02 201.23-245.02 294.987-246.002 93.758-.981 186.045 79.024 276.86 240.016'
            fill='none'/>
          <g>
            <path
              d='M1024.44 1.81c-10.107-.64-25.881-3.05-38.402 4.238-56.342 32.792-123.648 140.2-124.456 201.786 30.694 7.545 95.537-47.05 142.386-47.044 26.435 0 75.36 18.816 146.771 56.449C1101.72 79.302 1059.62 7.492 1024.44 1.81z'
              fill='#94877B'/>
            <path
              d='M1068.104 37.714c24.925 34.8 52.47 94.64 82.635 179.525-17.393-9.166-33.453-17.216-48.178-24.15 3.774-11.904 5.686-25.527 3.916-41.005-4.629-40.472-26.31-82.716-38.373-114.37z'
              fill='#716E6F'/>
          </g>
          <text className='FruitBanana__name' width='500'>
            <textPath xlinkHref='#peelPath' startOffset='0'>
              {name}
            </textPath>
          </text>
          <text className='FruitBanana__points' width='500'>
            <textPath xlinkHref='#pointsPath' startOffset='20%'>
              {1000}
            </textPath>
          </text>
          <text className='FruitBanana__action' width='500'>
            <textPath xlinkHref='#pointsPath' startOffset='0%'>
              {action}
            </textPath>
          </text>
        </g>
      </svg>
      <div className='FruitBanana__drawingWrapper'>
        <img className='FruitBanana__drawing' src={image}/>
      </div>
    </Fruit>
  );
}

export default FruitBanana;
