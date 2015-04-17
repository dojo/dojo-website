.. _dojox/grid/example_simple_grid:

A simple Grid
-------------

This example shows how to create a simple Grid declaratively.

.. code-example ::

  .. js ::

    <script type="text/javascript">
        dojo.require("dojox.grid.DataGrid");
        dojo.require("dojox.data.CsvStore");
    </script>

  .. html ::

    <span dojoType="dojox.data.CsvStore"
        jsId="store1" url="{{dataUrl}}dojox/grid/tests/support/movies.csv">
    </span>

    <table dojoType="dojox.grid.DataGrid"
        store="store1"
        query="{ Title: '*' }"
        clientSort="true"
        style="width: 400px; height: 200px;"
        rowSelector="20px">
        <thead>
            <tr>
                <th width="300px" field="Title">Title of Movie</th>
                <th width="50px">Year</th>
            </tr>
            <tr>
                <th colspan="2">Producer</th>
            </tr>
        </thead>
    </table>

  .. css ::

    <style type="text/css">
        @import "{{baseUrl}}dojox/grid/resources/Grid.css";
        @import "{{baseUrl}}dojox/grid/resources/nihiloGrid.css";

        .dojoxGrid table {
            margin: 0;
        }
    </style>
