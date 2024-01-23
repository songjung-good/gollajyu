package com.jaecheop.backgollajyu.exception;

public class NotEnoughPointException extends RuntimeException{
   public NotEnoughPointException(){
       super();
   }

   public NotEnoughPointException(String message){
       super(message);
   }

   public NotEnoughPointException(String message, Throwable cause){
       super(message, cause);
   }
}
