using System;
using System.Security.Cryptography; //hashing tools

public static class PasswordHelper
{
    private const int Iterations = 150_000; //Number of times we do the hashing process
    private const int SaltSize = 16;  //SaltSize is a random piece of data mixed with the password to prevent rainbow table attacks (bytes)
    private const int KeySize = 32; //The length of the outputted final hash (bytes)

    public static string HashPassword(string password)
    {
        //Creates an array of 16 bytes all random values
        var salt = new byte[SaltSize];
        var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);

        /*
        The built in Object for .NET Hashing. Repeatedly applies hashes over and over again. This doesnt hash, it just sets up the hashing object.

        hash1 = SHA256(password + salt)
        hash2 = SHA256(hash1 + password + salt)
        hash3 = SHA256(hash2 + password + salt)
        ...
        (150,000 times)

        */
        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);

        //Actually does the hashing giving us a hashed key
        var hash = pbkdf2.GetBytes(KeySize);

        //Converting to string and returning
        var hashedPassword = $"{Iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
        return hashedPassword;
    }
    public static bool VerifyPassword(string storedHash, string enteredPassword)
    {
        /* 
            splits stored db hash into parts
            parts[0] = "150000"
            parts[1] = "M6n5aLENoRSa0Ye/YDPinw=="
            parts[2] = "scBla2ZrhokO5Rv5+I3hS265TPgi5Sy2FvNIqUmylRo="
        */
        var parts = storedHash.Split(".");
        int iterations = int.Parse(parts[0]);
        byte[] salt = Convert.FromBase64String(parts[1]);
        byte[] storedSubKey = Convert.FromBase64String(parts[2]);

        // Sets up the Hasher to use the user password with the exact same salt and iterations we used on the one found in the DB (we search by email)
        var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, iterations, HashAlgorithmName.SHA256);

        //Actually does the hashing giving us a hashed key
        byte[] computedSubkey = pbkdf2.GetBytes(storedSubKey.Length);

        // Safe comparision to prevent timing attacks (how long it takes to compare a key)
        return CryptographicOperations.FixedTimeEquals(storedSubKey, computedSubkey);


    }
}