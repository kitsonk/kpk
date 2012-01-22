.. _kpk/Package:

kpk Package
===========

:Authors: Kitson Kelly :Project Owner: Kitson Kelly

.. contents ::
    :depth: 2
    
This package contains a few widgets which I have developed based on the `Dojo Toolkit <http://dojotoolkit.org/>`_.

kpk/StreamContainer
-------------------

The StreamContainer is a widget that is similiar to "stream" UI elements seen on social media sites, where generally new
items appear at the top of the stream and progressively get older.

The StreamContainer supports the concept of insertion of new items at the top and loading of "more" items at the bottom.
The "more" can be set as a button which the user clicks, to automatically fire when it scrolls into view, or be hidden.

kpk/DataStreamContainer
-----------------------

The DataStreamContainer is a data and store aware widget that can be connected to Dojo Store or DataStore.

kpk/PageScroller
----------------

A widget that is used to display lazy load "pages" and display in a vertical fashion.  Ideal for scrolling through large
text files, like logs. ** In Development **

Requirements/Dependencies
-------------------------

- Dojo 1.7+
- Dijit 1.7+
