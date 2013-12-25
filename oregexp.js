/*
 *   oregexp.js
 *  
 *
 *   Created by Marco Rondini on 10/05/12.
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published
 *   by the Free Software Foundation; version 2 of the License.
 *   
 *   This program is distributed in the hope that it will be useful, but
 *   WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *   or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 *   for more details.
 *   
 *   You should have received a copy of the GNU General Public License along
 *   with this program; if not, write to the Free Software Foundation, Inc.,
 *   51 Franklin St, Fifth Floor, Boston, MA 02110-1301  USA
 *
 */


RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

RegExp.prototype.oexecAll = function(string) {
	
	var testR = /\(([^\)]+)\)/g;
	var res = testR.execAll(this.source);
	
	for ( var r in res ){
		if ( !res[r][1].match(/^\{/) ){
			var i = this.source.indexOf('(' + res[r][1]);
			console.error('ORegExp Error: key not found at ' + i + ' : \'(' + res[r][1] + '\'');
			return false;
		}
	}

	var or = new RegExp(this.source.replace( /\(\{(.*?)\}/g, "("));
	
	var matchgrp = /\(\{(.*?)\}/g;
	var res_keys = matchgrp.execAll(this.source);
	
	var keys = [];
	
	for ( i = 0; i < res_keys.length; i++ ){
		keys[i] = res_keys[i][1];
	}
	
	var r_ret = or.exec(string);
	var ret = {};
	
	if ( r_ret == null )
		return string;
	
	for ( i = 1; i < r_ret.length; i++ ){
		ret[keys[i-1]] = r_ret[i];
	}
	return ret;
}
