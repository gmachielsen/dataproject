Stream2 - interactive front end development coding project Live link: https://gmachielsen.github.io/dataproject/

Purpose: • The purpose of this project is to build a nice datacentric dashboard. Therefore I have decided to build a e-commerce dashboard which is simulating the sales of an online-shop based in the Netherlands and which is attracting Dutch Customers. The online-shop is a sportshop, which is selling items about tennis, running and fitness in 2012 and 2013. In order to build this dashboard I have used 6 graphs namely: 

1. a graph which is showing the revenue by date in a linegraph.
2. showing the revenue by state, so that you that the analyst is able to compare and analyse where in the Netherlands the revenue is generated. 
3. A piechart which is showing the weight of the online shop categories for its total revenue.
4. A gender piechart which is showing the how the revenue is distributed by gender.
5. A piechart which is showing in how much customers per order spend in the shop, allocated by three categories above 200 and under 100 euros and in between.
6 is a bar chart which is displaying the total revenue per customer.

By clicking on the pie chart, the bar chart or the line chart the dc.crossfilter kicks in charts will dymamically respond.

I have used the following techniques:

Bootstrap:

This is used for the development of the lay out of this dashboard, namely 2 rows of 3 columns.

dc.js a dimensional charting javascrpt library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets.

d3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.

CSS this is used, to make the hover effect and for styling the colors and fonts of this dashboard. 

Json the json file is made by myself as I found it hard to find ecommerce revenue data. The graphs are reading the dating from the json file in the html the graphs are displayed.

Deployment
This data project is deployed via githubpages. 

Credits
Code Instute has the credits for teaching me how to make graphs with javascript D3.

