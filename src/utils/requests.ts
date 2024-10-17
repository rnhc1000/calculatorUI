import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from '../services/auth-services';

export function requestBackEnd(config: AxiosRequestConfig) {


    const headers = config.withCredentials
        ? 
        {
            ...config.headers,
            Authorization: "Bearer " + authService.getAccessToken()
        }
        : 
        config.headers;

    return axios({ ...config, baseURL: BASE_URL, headers })
}

axios.interceptors.request.use( function (config) {


    return config;
}, function(error){

    return Promise.reject(error);
});

axios.interceptors.response.use( function (response){

    return response;
}, function(error) {


    return Promise.reject(error);
}

    // response => response,
    // error => {

    //     if(error.response ) {
    //         // console.log(error.response.data);
    //         console.log(error.message);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);


    //         return Promise.reject(error.response.data);
    //     }
    //     console.log(error);
    //     console.log(error.message);

    //     // console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);

    //     return Promise.reject(error);

    // }
);


/**
 * axios.interceptors.request.use(

    config => config,

    error => {
        return error.request;
    }
);
 * axios.interceptors.response.use(

    response => response,
    error => {

        if(error.response ) {
            // console.log(error.response.data);
            console.log(error.message);
            console.log(error.response.status);
            console.log(error.response.headers);


            return Promise.reject(error.response.data);
        }
        console.log(error);
        console.log(error.message);

        // console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return Promise.reject(error);

    }
);
 * Using a QueryBuilder in Java typically involves creating a class that helps you build SQL or HQL queries in a fluent, programmatic style. Below are steps and a simple example of how to use a QueryBuilder pattern in Java:

Steps to Create a Simple QueryBuilder
Define Criteria: Start by defining what parts of the query you want to include (e.g., SELECT, FROM, WHERE, etc.).

Create the QueryBuilder Class: This class should provide methods for each part of the SQL query.

Use Method Chaining: Implement method chaining to allow for a clean and fluid interface.

Build the Query: Finally, provide a method to output the constructed SQL query.

Example: Simple SQL QueryBuilder
Here's a simple example of a QueryBuilder class for building SQL queries.

public class QueryBuilder {  
    private StringBuilder query;  

    public QueryBuilder() {  
        query = new StringBuilder();  
    }  

    public QueryBuilder select(String... columns) {  
        query.append("SELECT ");  
        query.append(String.join(", ", columns));  
        return this;  
    }  

    public QueryBuilder from(String table) {  
        query.append(" FROM ").append(table);  
        return this;  
    }  

    public QueryBuilder where(String condition) {  
        query.append(" WHERE ").append(condition);  
        return this;  
    }  

    public QueryBuilder orderBy(String column) {  
        query.append(" ORDER BY ").append(column);  
        return this;  
    }  

    public String build() {  
        return query.toString();  
    }  
}  
Using the QueryBuilder
You can use the QueryBuilder class as follows:

public class Main {  
    public static void main(String[] args) {  
        QueryBuilder queryBuilder = new QueryBuilder();  

        String query = queryBuilder  
            .select("id", "name", "age")  
            .from("users")  
            .where("age > 18")  
            .orderBy("name")  
            .build();  

        System.out.println(query);  
    }  
}  
Output
The output of the above code will be:

SELECT id, name, age FROM users WHERE age > 18 ORDER BY name  
Advantages of Using QueryBuilder
Readability: Makes queries easier to read and understand.
Maintainability: Easier to modify parts of a query without handling string concatenation directly.
Error Prevention: Reduces risks of syntax errors in SQL.
Dynamic Queries: Easily build dynamic queries based on conditions.
Libraries
For more advanced features, consider using libraries like JOOQ or Hibernate Criteria Query which provide extensive QueryBuilder functionality with the added benefit of being database-agnostic and type-safe.

Conclusion
A QueryBuilder can greatly simplify the task of dynamically constructing SQL queries in Java, making your code cleaner and more maintainable. You can enhance the example to handle more complex cases, including joins, group by, and having clauses, depending on your specific requirements.

favicon

 */
