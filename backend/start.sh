#!/bin/bash
# Disable DEBUG_URL to prevent path-to-regexp crash
unset DEBUG_URL

# Start backend server
node server.js
