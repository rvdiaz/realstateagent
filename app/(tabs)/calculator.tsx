import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, Chrome as Home, DollarSign, Percent, TrendingUp } from 'lucide-react-native';

export default function CalculatorScreen() {
  const [activeCalculator, setActiveCalculator] = useState<'mortgage' | 'loan' | 'investment'>('mortgage');
  
  // Mortgage Calculator State
  const [mortgageData, setMortgageData] = useState({
    loanAmount: '300000',
    interestRate: '6.5',
    loanTerm: '30',
    downPayment: '60000',
  });

  const [mortgageResult, setMortgageResult] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
  });

  const calculateMortgage = () => {
    const principal = parseFloat(mortgageData.loanAmount) - parseFloat(mortgageData.downPayment);
    const monthlyRate = parseFloat(mortgageData.interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(mortgageData.loanTerm) * 12;

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const totalAmount = monthlyPayment * numberOfPayments;
      const totalInterest = totalAmount - principal;

      setMortgageResult({
        monthlyPayment: monthlyPayment,
        totalInterest: totalInterest,
        totalAmount: totalAmount,
      });
    }
  };

  React.useEffect(() => {
    calculateMortgage();
  }, [mortgageData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculators = [
    { id: 'mortgage', label: 'Mortgage', icon: Home },
    { id: 'loan', label: 'Loan', icon: DollarSign },
    { id: 'investment', label: 'Investment', icon: TrendingUp },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Financial Calculator</Text>
          <Text style={styles.subtitle}>Calculate quotes and financial projections</Text>
        </View>
        <Calculator size={28} color="#3B82F6" />
      </View>

      <View style={styles.calculatorTabs}>
        {calculators.map((calc) => {
          const IconComponent = calc.icon;
          return (
            <TouchableOpacity
              key={calc.id}
              style={[styles.calculatorTab, activeCalculator === calc.id && styles.activeCalculatorTab]}
              onPress={() => setActiveCalculator(calc.id as any)}
            >
              <IconComponent 
                size={20} 
                color={activeCalculator === calc.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.calculatorTabText,
                activeCalculator === calc.id && styles.activeCalculatorTabText
              ]}>
                {calc.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeCalculator === 'mortgage' && (
          <View style={styles.calculatorContent}>
            <Text style={styles.calculatorTitle}>Mortgage Calculator</Text>
            <Text style={styles.calculatorDescription}>
              Calculate your monthly mortgage payments and total interest
            </Text>

            <View style={styles.inputSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Loan Amount</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.textInput}
                    value={mortgageData.loanAmount}
                    onChangeText={(text) => setMortgageData({...mortgageData, loanAmount: text})}
                    keyboardType="numeric"
                    placeholder="300,000"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Down Payment</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.textInput}
                    value={mortgageData.downPayment}
                    onChangeText={(text) => setMortgageData({...mortgageData, downPayment: text})}
                    keyboardType="numeric"
                    placeholder="60,000"
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Interest Rate</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.textInput}
                      value={mortgageData.interestRate}
                      onChangeText={(text) => setMortgageData({...mortgageData, interestRate: text})}
                      keyboardType="numeric"
                      placeholder="6.5"
                    />
                    <Text style={styles.percentSymbol}>%</Text>
                  </View>
                </View>

                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Loan Term</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.textInput}
                      value={mortgageData.loanTerm}
                      onChangeText={(text) => setMortgageData({...mortgageData, loanTerm: text})}
                      keyboardType="numeric"
                      placeholder="30"
                    />
                    <Text style={styles.yearsLabel}>years</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>Calculation Results</Text>
              
              <View style={styles.resultCard}>
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Monthly Payment</Text>
                  <Text style={styles.resultValue}>
                    {formatCurrency(mortgageResult.monthlyPayment)}
                  </Text>
                </View>
                
                <View style={styles.resultDivider} />
                
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Total Interest</Text>
                  <Text style={[styles.resultValue, styles.interestValue]}>
                    {formatCurrency(mortgageResult.totalInterest)}
                  </Text>
                </View>
                
                <View style={styles.resultDivider} />
                
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Total Amount</Text>
                  <Text style={styles.resultValue}>
                    {formatCurrency(mortgageResult.totalAmount)}
                  </Text>
                </View>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Payment Breakdown</Text>
                <View style={styles.summaryItem}>
                  <View style={styles.summaryLabel}>
                    <View style={[styles.summaryDot, { backgroundColor: '#3B82F6' }]} />
                    <Text style={styles.summaryText}>Principal</Text>
                  </View>
                  <Text style={styles.summaryValue}>
                    {formatCurrency(parseFloat(mortgageData.loanAmount) - parseFloat(mortgageData.downPayment))}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <View style={styles.summaryLabel}>
                    <View style={[styles.summaryDot, { backgroundColor: '#EF4444' }]} />
                    <Text style={styles.summaryText}>Interest</Text>
                  </View>
                  <Text style={styles.summaryValue}>
                    {formatCurrency(mortgageResult.totalInterest)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeCalculator === 'loan' && (
          <View style={styles.calculatorContent}>
            <Text style={styles.calculatorTitle}>Loan Calculator</Text>
            <Text style={styles.calculatorDescription}>
              Calculate personal loan payments and terms
            </Text>
            <View style={styles.placeholderContent}>
              <Text style={styles.placeholderText}>Loan calculator coming soon...</Text>
            </View>
          </View>
        )}

        {activeCalculator === 'investment' && (
          <View style={styles.calculatorContent}>
            <Text style={styles.calculatorTitle}>Investment Calculator</Text>
            <Text style={styles.calculatorDescription}>
              Calculate investment returns and compound interest
            </Text>
            <View style={styles.placeholderContent}>
              <Text style={styles.placeholderText}>Investment calculator coming soon...</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  calculatorTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  calculatorTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  activeCalculatorTab: {
    backgroundColor: '#3B82F6',
  },
  calculatorTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeCalculatorTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  calculatorContent: {
    padding: 20,
  },
  calculatorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  calculatorDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  percentSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  yearsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  resultsSection: {
    marginTop: 32,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  resultDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  resultLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  interestValue: {
    color: '#EF4444',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  placeholderContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
  },
});